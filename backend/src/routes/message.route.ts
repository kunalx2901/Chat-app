import express, { Response } from 'express'
import { CustomRequest, protectRoute } from '../middleware/auth.middleware';
import { Request } from '../controllers/auth.controller';
import { GetMessage, GetUsersForSidebar, SendMessage } from '../controllers/message.controller';

const router  = express.Router();

router.get("/users" , 
    async(req,res,next)=>{
        await protectRoute(req as CustomRequest , res , next);
    } , 
    async(req,res)=>{
        await GetUsersForSidebar(req as Request , res);
});

router.get("/:id" , 
    async(req,res,next)=>{
        await protectRoute(req as any, res , next);
    },
    async(req,res)=>{
        await GetMessage(req as any ,res)
})

router.post("/send/:id" , 
    async(req,res,next)=>{
        await protectRoute(req as any, res , next);
    },
    async(req,res)=>{
        await SendMessage(req as any ,res)
})


export default router;