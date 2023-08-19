export const PORT = 3000;
export const JWT_SECRET_KEY = "asdfasdfasdf";
import jwt from "jsonwebtoken"
export const getUserId = (token : string)=>{
  
    const {id: userId} : any  = jwt.verify(token, JWT_SECRET_KEY);
    return userId;
}