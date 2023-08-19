
import { Product } from "../entities/Product";
import { CartProduct } from "../entities/CartProduct"
import { JWT_SECRET_KEY } from "../constants";
import jwt from "jsonwebtoken"
// import { conn } from "../utils/DataSource";
export const showCart = async(req: any,res: any)=>{
   const token = req.headers.authorization.split(" ")[1];
   const {id: userId} : any  = jwt.verify(token, JWT_SECRET_KEY);
  

     const getCartItems = await CartProduct.findBy({userId});
     if(getCartItems)
     {
        res.status(200).json(getCartItems);
     }
     else{
        res.status(400).json({
            error:"Sorry, couldn't able to fetch the cart"
        })
     }
}




export const addToCart = async(req: any,res: any)=>
{
    const {title,cost,quantity} = req.body;
    const token = req.headers.authorization.split(" ")[1];
   const {id: userId} : any  = jwt.verify(token, JWT_SECRET_KEY);
    if(!title || !cost || !quantity) 
    {
        res.status(400).json({
            error: "please enter all the fields(title,cost,quantity)"
        })
        return;
    }
    const validProduct = await Product.findBy({title});
    if(validProduct.length==0)
    {
        res.status(400).json({
            error:"No such product exists"
        })
        return;
    }
    const product = await CartProduct.findBy({ userId,title});
if(product.length!=0)
{
    res.status(400).json({
        error: "Already present in the cart"
    })
    return;
}
const productInCart = await CartProduct.create({title,cost,quantity,userId}).save();
if(productInCart)
{
     res.status(200).json(productInCart)
     return;
}
else{
    res.status(400).json({
        error: "Sorry, unable to add to the cart"
    })

    return;
}


}

export const updateCart = async(req: any,res: any) =>{
    const token = req.headers.authorization.split(" ")[1];
   const {id: userId} : any  = jwt.verify(token, JWT_SECRET_KEY);
  
    const {id} = req.params
    const {quantity: quantityFromReq} = req.body;
    if(!quantityFromReq || !id)
    {
      res.status(400).json({
        error: "please enter the required fields(quantity,id)"
      })
      return;
    }
    const product = await CartProduct.findBy({id,userId});
    if(product.length==0)
    {
        res.status(400).json({
            error: "Product doesn't exists"
          })
          return;
    }
    const quantity = product[0].quantity;
    if(quantity+quantityFromReq<0)
    {
        res.status(400).json({
            error: "Quantity decreasing below zero"
          })
          return;
    }
    product[0].quantity = quantity+quantityFromReq;
   const savedProduct = await CartProduct.save(product);
    if(savedProduct)
    {
        res.status(200).json(savedProduct)
        return;
    }
    else{
        res.status(400).json({
            error: "Sorry, couldn't update the product,Try again"
        })
        return;
    }
}

export const removeItemFromCart = async (req: any,res: any)=>{
    const {id} = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const {id: userId} : any  = jwt.verify(token, JWT_SECRET_KEY);
    const product = await CartProduct.findOneBy({userId,id});
    if(!product)
    {
        res.status(400).json({
            error: "product doesn't exist already"
        })
        return;
    }
    const removedProduct = await CartProduct.remove(product);
    if(removedProduct)
    {
        res.status(200).json(removedProduct);
        return;
    }
    else{
        res.status(400).json({
            error: "Sorry,couldn't able to remove the item"
        });
        return;
    }


}