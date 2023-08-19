import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { JWT_SECRET_KEY } from "../constants";


export const protect = async (req: any, res: any, next : any) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded: any = jwt.verify(token, JWT_SECRET_KEY);

      req.user = await User.findBy({id: decoded.id});

      next();
    } catch (error) {
      res.status(401).json({
        "error" : "Not authorized, token failed"
      });
    return;
    }
  }

  if (!token) {
    res.status(401).json({
        "error" : "Not authorized, no token"
      });
    return;
    
  }
};