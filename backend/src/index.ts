import express from 'express'
import authRoute from './routes/auth.route';
import dotenv from 'dotenv';
import connectDb from './lib/db'
import cookieParser from 'cookie-parser'
import { CustomRequest, protectRoute } from './middleware/auth.middleware';
import messageRoute from './routes/message.route'
import cors from 'cors'


dotenv.config()
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth", authRoute);
app.use("/api/message",
    async(req,res,next)=>{
        await protectRoute(req as CustomRequest , res , next);
    }, messageRoute);


app.listen(PORT , ()=>{
    console.log({"msg":"server is running on port " + PORT});
    connectDb({res:200});
})
