import User from "../models/user.model";
import {Response} from "express";
import {Request} from "../controllers/auth.controller";
import Message from "../models/message.model";
import {v2 as cloudinary} from 'cloudinary'

export const GetUsersForSidebar = async (req:Request, res:Response)=>{
    try {
        const loggedInUser = req.user._id;
        const users = await User.findOne({_id:{$ne:loggedInUser}}).select("-password");

        res.status(200).json({
            status: "success",
            users
        })
        
    } catch (error) {
        console.log("Error occured in the GetUsersForSidebar controller "+ error);
        res.status(500).json({
            msg:"Internal Server Error !"
        })   
    }
}

export const GetMessage = async (req:Request , res:Response)=>{
    try {
        const myId = req.user._id;
        const {id:receiverId }= req.params;

        const messages = await Message.find({
            $or:[
                {senderId:myId , receiverId:receiverId},
                {senderId:receiverId , receiverId:myId}
            ]
        })

        res.status(200).json({
            messages
        })

    } catch (error) {
        console.log("Error occured in the GetMessage controller "+ error);
        res.status(500).json({
            msg:"Internal Server Error !"
        })        
    }
}

export const SendMessage = async (req:Request , res:Response)=>{
    
    try{
        const {text, image} = req.body;
        const myId = req.user._id;
        const {id:receiverId} = req.params;

        let imageUrl;
        if(image){
            const imageBuffer = await cloudinary.uploader.upload(image);
            imageUrl = imageBuffer.secure_url;
        }

        const newMessage = new Message({
            senderId:myId,
            receiverId ,
            text ,
            image:imageUrl
        })

        await newMessage.save();
        // todo: realtime funtionality goes here : socket.io
        
        res.status(200).json({
            msg:"Message Sent !"
        })

    }catch(e){
        console.log("Error occured in the SendMessage controller "+ e);
        res.status(500).json({
            msg:"Internal Server Error !"
        })

    }
}
