import { DataSource } from "typeorm";
import { User } from "../entities/User.js";
import { Category } from "../entities/Category.js";
import { Product } from "../entities/Product.js";
import { CartProduct } from "../entities/CartProduct.js";
import { OrderProduct } from "../entities/OrderProduct.js";
import {Order} from "../entities/Order.js";

export const conn = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Goldee@123",
    database: "ecommerce",
    synchronize: true,
    logging: true,
    charset: "utf8mb4",
    entities: [User,Category,Product,CartProduct,Order,OrderProduct],
    subscribers: [],
  })