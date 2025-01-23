import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Response } from "express";

dotenv.config();

export const generateToken = ({userId , res}:{userId:string , res:any})=>{

    const token = jwt.sign({userId} , process.env.JWT_SECRET || "" , 
        {expiresIn:"7d"}
    )

    res.cookie("jwt" , token , {
        httpOnly:true,
        secure:process.env.NODE_ENV !== "development",
        sameSite:"none",
        maxAge:7*24*60*60*1000
    })

    return token;
}