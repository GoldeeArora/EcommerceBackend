import { protect } from './../middleware/isAuth';
import express from "express"
import { getAllCategories, addCategories } from '../controllers/categoryControllers';

export const router = express.Router();

router.route("/getCategories").get(protect,getAllCategories);
router.route("/addCategories").post(protect,addCategories);