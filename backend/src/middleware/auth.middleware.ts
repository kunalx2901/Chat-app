import { Request , Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user.model'

export interface CustomRequest extends Request {
    user: object
  }

  export const protectRoute = async(req:CustomRequest , res:Response , next:Function)=>{
    
      console.log("req cookie value "+req.cookies.jwt);
    try {
        const token = req.cookies.jwt;

       
        if (!token) {
            return res.status(401).json({ msg: "No token provided!" });
          } 
        

        if(!process.env.JWT_SECRET){
            throw new Error('JWT_SECRET is not defined');
        }
        
        const decoded = await jwt.verify(token , process.env.JWT_SECRET) as JwtPayload;

        if(!decoded){
            return res.status(401).json({
                msg:"Invalid Token !"
            })
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({
                msg:"User does not exist! "
            })
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("Error Occured Due to "+ error );
        res.status(500).json({
            msg:"Internal Server Error !"
        })   
    }
}