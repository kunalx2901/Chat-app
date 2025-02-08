import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Response } from "express";

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not set in environment variables');
}

export const generateToken = async({userId , res}:{userId:string , res:any})=>{

  try {
    const token = await jwt.sign({userId} , process.env.JWT_SECRET || "" , 
      {expiresIn: '7d'}
    )
    console.log(`Token generated: ${token}`);

    try{
      await res.cookie("jwt" , token , {
        httpOnly:false,
        secure:process.env.NODE_ENV !== "development",
        sameSite:true,
        maxAge:7*24*60*60*1000
      })

      console.log("Cookie generated " + token);
    }catch(error){
      console.error(`Error setting cookie: ${error}`);
    }
    
    return token;
  } catch (error) {
    console.error(`Error generating token: ${error}`);
    res.clearCookie("jwt");
    res.status(500).json("Internal Server Error !")
  }
}