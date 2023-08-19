
import { protect } from './../middleware/isAuth';
import express from "express"
import { getOrderById, placeOrder,showOrders } from '../controllers/orderControllers';
export const router = express.Router();

router.route("/placeOrder").get(protect,placeOrder);
router.route("/showOrders").get(protect,showOrders);
router.route("/getOrderById/:id").get(protect,getOrderById);

