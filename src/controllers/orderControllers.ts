import { CartProduct } from "../entities/CartProduct";
import { getUserId } from "../constants"
import { OrderProduct } from "../entities/OrderProduct";
import { Order } from "../entities/Order";
export const placeOrder = async (req : any,res: any)=>{
    const userId = getUserId(req.headers.authorization.split(" ")[1]);
   const orderId = await Order.count()+1;
    const cartProducts = await CartProduct.findBy({userId});
    if(cartProducts.length==0){
         res.status(400).json({
            error: "Please fill the cart"
         })
         return;
    }
    let totalCost = 0;
    const orderProducts = cartProducts.map((cartProduct : any)=>{
        const orderProduct = new OrderProduct();
        orderProduct.title = cartProduct.title;
        orderProduct.cost = cartProduct.cost;
        orderProduct.quantity = cartProduct.quantity;
        orderProduct.orderId = orderId;
        orderProduct.userId = userId;
        totalCost = totalCost + cartProduct.cost * cartProduct.quantity;
return orderProduct;
        
    })
    try{

        await OrderProduct.save(orderProducts);
        await CartProduct.remove(cartProducts)
    }
    catch(error: any)
    {
        console.log(error.message);
        res.status(400).json({
            error: "Sorry, we are unable to place the order"
        })
        return;
    }
    
    const order = await Order.create({
        userId,
        totalCost
    }).save();
    if(order)
    {
        res.status(200).json({
            ...order,
            orderProducts
           
        })
        return;
    }
else{
    res.status(400).json({
        error: "Sorry, we are unable to place the order"
    })
    return;
}
    

}

export const showOrders = async (req: any, res: any)=>{
  
    const userId = getUserId(req.headers.authorization.split(" ")[1]);
             const orders = await Order.findBy({userId});
            
             const dataPromises = orders.map(async(order)=>{
                const orderProducts = await OrderProduct.findBy({orderId: order.id,userId})

                       const singleData = {
                        ...order,
                        orderProducts

                       }
                      
                       return singleData;
             })
             const data = await Promise.all(dataPromises); ;
        
             if(data)
             {
                res.status(200).json(data);
                return;
             }
             else{
                res.status(400).json({
                    error: "Sorry, cannot show the data"
                })
                return;
             }
}

export const getOrderById = async(req: any,res:any) =>{
    const {id} = req.params;
    const order = await Order.findOneBy({id});
    const orderProducts = await OrderProduct.findBy({orderId: id});
    const data = {
     ...order,
     orderProducts,
    }
    console.log(data);
    if(data)
             {
                res.status(200).json(data);
                return;
             }
             else{
                res.status(400).json({
                    error: "Sorry, cannot show the data"
                })
                return;
             }
}