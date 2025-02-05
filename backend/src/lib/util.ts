import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Response } from "express";

dotenv.config();

export const generateToken = async({userId , res}:{userId:string , res:any})=>{

    try {
        const token = await jwt.sign({userId} , process.env.JWT_SECRET || "" , 
            {expiresIn:"7d"}
        )
        console.log(token);
        await res.cookie("jwt" , token , {
            httpOnly:true,
            secure:process.env.NODE_ENV !== "development",
            sameSite:true,
            maxAge:7*24*60*60*1000
        })
        
        return token;
    } catch (error) {
        console.log("error in generate token function"+error);
    }
}