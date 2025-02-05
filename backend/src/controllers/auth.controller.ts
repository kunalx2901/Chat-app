import express , {Response} from 'express'
import User from '../models/user.model'
import bcrypt from 'bcryptjs'
import { generateToken } from '../lib/util';
import cloudinary from '../lib/cloudinary'
import { CustomRequest } from '../middleware/auth.middleware';


export interface Request extends CustomRequest {
     user:{
          _id:string
     }
}


export const signup = async(req:Request,res:Response)=>{
     const {fullname , email , password} = req.body;

     try{
          if(!fullname || !email || !password){
               return res.status(400).json({message:"All fields are required"});
          }

          if(password.length < 6){
               return res.status(400).json({message:"Password must be at least 6 characters long"});
          }

          const user = await User.findOne({email});
          if(user){
               res.json({message:"User already exists"});
          }
          else{
               const hashedPassword = await bcrypt.hash(password , 10);
               const newUser = await new User({
                    fullname:fullname,
                    email:email,
                    password:hashedPassword,
               })

               if(newUser){
                    // generate jwt token 
                   try {
                    const jwt = await generateToken({userId:newUser._id.toString() , res:res});
                    console.log("jwt token generated : " + jwt);
                   } catch (error) {
                    console.log("error in generating token "+ error); 
                   }
                    await newUser.save();
                    
                    res.status(201).json({
                         id:newUser._id,
                         fullname:newUser.fullname,
                         email:newUser.email,
                         profileImage:newUser.profileImage       
                    })
                    

               }
               else{
                    res.status(400).json({
                         message:"Invalid data credentials !"
                    })
               }

          }

     }catch(e){
          console.log(e);
          res.status(500).json({
               message:"Internal Server Error !"
          })

     }

}

export const login = async (req:Request,res:Response)=>{
     const { email , password } = req.body;
     try{
          const user = await User.findOne({email});
          if(!user){
               return res.status(400).json({
                    msg:"Invalid Credentials !"
               })
          }

          const isCorrectPassword = await bcrypt.compare(password , user.password);
          if(!isCorrectPassword){
               return res.status(400).json({
                    msg:"Invalid Credentials !"
               })
          }

          generateToken({userId:user._id.toString() , res:res});

          res.status(200).json({
               msg:"User logged in successfully !"
          })
     }catch(e){
          console.log("Error Occured Due to "+ e );
          res.status(500).json({
               message:"Internal Server Error !"
          })
     }

}

export const logout = (req:Request,res:Response)=>{
     res.cookie("jwt" , "" , {maxAge:0});
     res.status(200).json({
          msg:"User Logged out !"
     })
}

export const updateProfile = async(req:Request,res:Response)=>{
     try {
          const {profileImage} = req.body;
          const userId = req.user._id;

          if(!profileImage){
               return res.status(400).json({
                    msg:"Please provide a profile image !"
               })
          }

          const uploaderResponse = await cloudinary.uploader.upload(profileImage)
          const user  = await User.findOneAndUpdate({_id:userId} , {profileImage:uploaderResponse.secure_url} , {new:true});

          res.status(200).json({
           updatedUser:user    
          })
     } catch (error) {
          console.log("Error Occured Due to "+ error );
          res.status(500).json({
               message:"Internal Server Error !"
          })
     }
}

export const checkRoute = async(req:Request,res:Response)=>{
     try {
          res.json(req.user);
     } catch (error) {
          console.log("error in checkAuth controller "+ error);
          res.status(500).json({
               message:"Internal Server Error !"
          })
     }
}