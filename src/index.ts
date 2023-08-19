import "reflect-metadata";
import dotenv from 'dotenv';
import express from "express";
import {conn} from "./utils/DataSource.js"
import {router as userRoutes }from "./routes/userRoutes.js"
import {router as categoryRoutes} from "./routes/categoryRoutes.js"
import {router as productRoutes} from "./routes/productRoutes.js"
import {router as cartRoutes} from "./routes/cartRoutes.js"
import {router as orderRoutes} from "./routes/orderRoutes.js"
// import { User } from "./entity/User"; // Create this file in a "entity" folder
dotenv.config();
const main  = async()=>{
    const app = express();
    const PORT = 3000;
    
    app.use(express.json());
  
    
      await conn.initialize();
    
      app.use("/api/user", userRoutes);
      app.use("/api/category",categoryRoutes);
      app.use("/api/product",productRoutes);
      app.use("/api/cart",cartRoutes);
      app.use("/api/order",orderRoutes);
    //   app.use("/api/chat", chatRoutes);
    //   app.use("/api/message", messageRoutes);
    
      app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        })
        console.log(process.env.PORT);
    
  
}

main().catch((error)=>{
    console.log("error: " + error.message)
})