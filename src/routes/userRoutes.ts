import express from "express"
import { registerUser,loginUser } from "../controllers/userControllers";

export const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

