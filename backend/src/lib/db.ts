import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async(res:any)=>{
    const url = process.env.MONGODB_URI || " ";
    try{
        const conn = await mongoose.connect(url)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }catch(e){
        console.log(e)
        
        res.json({
            error:"Internal Server Error !"
        })
    }
}

export default connectDb;