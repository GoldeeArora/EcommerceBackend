
import { protect } from './../middleware/isAuth';
import express from "express"
import { getProductsByCategory,addProduct,getProductById} from '../controllers/productControllers';

export const router = express.Router();

router.route("/getProductsByCategory").get(protect,getProductsByCategory);
router.route("/addProduct").post(protect,addProduct);
router.route("/getProductById/:productId").get(protect,getProductById);