
import { protect } from './../middleware/isAuth';
import express from "express"
import { showCart,addToCart,updateCart, removeItemFromCart} from "../controllers/cartController";

export const router = express.Router();

router.route("/viewCart").get(protect,showCart);
router.route("/addToCart").post(protect,addToCart);
router.route("/updateCart/:id").put(protect,updateCart);
router.route("/removeItem/:id").delete(protect,removeItemFromCart);
