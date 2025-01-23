import mongoose from 'mongoose';
import User from './user.model';

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        req:User,
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        req:User,
        required:true
    },
    text:{
        type:String,
    },
    image:{
        type:String
    }
} , {timestamps:true});

const Message = mongoose.model("Message" , messageSchema);

export default Message;