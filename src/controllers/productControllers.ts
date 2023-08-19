import { Product } from "../entities/Product";
import { Category } from "../entities/Category";

export const getProductsByCategory = async (req: any,res: any)=>{
   const categoryId = req.query.categoryId;
   console.log(categoryId)
   const noCategory = await Category.findBy({id : categoryId});
   console.log(noCategory)
    if(noCategory.length==0)
    {
        res.status(400).json({
            error: "Category doesn't Exists"
          });
          return;
    }
    const products = await Product.findBy({categoryId});
    if(products)
    res.status(200).json(products)
else{
    res.status(400).json({
        "error": "Couldn't able to create the product"
    })
    return;
}

}

export const addProduct = async (req: any,res: any)=>{
    const { title,price,description,availability,categoryId } = req.body;
   
    if(!title || !price || !description || !availability || !categoryId)
    {
        res.status(400).json({
            error: "Please Enter all the fields(title,price,description,availability,categoryId)"
          });
          return;
    }
    const noCategory = await Category.findBy({id : categoryId});
    if(noCategory.length==0)
    {
        res.status(400).json({
            error: "Category doesn't Exists"
          });
          return;
    }
    const checkProduct = await Product.findBy({title});
    if(checkProduct.length!=0)
    {
        res.status(400).json({
            error: "Product Already exists"
          });
          return;
    }

    const product = await Product.create({title,price,description,availability,categoryId}).save();
    if(product)
    res.status(200).json(product)
else{
    res.status(400).json({
        "error": "Couldn't able to create the product"
    })
    return;
}
    
return
}

export const getProductById = async (req: any, res: any) =>
{
const productId = req.params.productId;
const product = await Product.findBy({id:productId});
if(product.length==0)
{
    res.status(400).json({
        error: "Product doesn't Exist"
      });
      return;
}
res.status(200).json(product);
return;
}