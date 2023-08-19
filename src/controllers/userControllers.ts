import { User } from "../entities/User";
import { generateToken } from "../utils/generateToken";
import argon2 from "argon2"
export const registerUser = async (req: any, res: any) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
  
      res.status(400).json({
        error: "Please Enter all the Feilds"
      });
      return;
    }
  
    const userExists = await User.findOneBy({ email });
  
    if (userExists) {
      res.status(400).json({
        error: "User already exists"
      });
      return;
    }
    const  hashedPassword =await argon2.hash(password);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,

    }).save();
  
    if (user) {
      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({
        error: "User not found"
      });
      
    }
  };

  export const loginUser = async (req: any, res: any) => {
    const { email, password } = req.body;
  
    const user: any = await User.findOneBy({ email });
    const valid = await argon2.verify(user.password,password);
    if (user && valid) {
      res.json({
        id: user.id,
        name: user.username,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({
        error: "Invalid Email or Password"
      });

    }
  };