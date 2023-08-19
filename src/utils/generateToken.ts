import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../constants';

// Payload to be encoded in the token
export const generateToken = (id: number)=>{
    const secretKey = JWT_SECRET_KEY; // Replace with your actual secret key

    // Generate the JWT
    const token = jwt.sign({id}, secretKey, { expiresIn: '30d' }); 
    
    // console.log('Generated token:', token);
    return token;
}

// Secret key used to sign the token

