import express from 'express'
import { signup , login , logout, Request, checkRoute } from '../controllers/auth.controller';
import {updateProfile} from '../controllers/auth.controller';
import { protectRoute } from '../middleware/auth.middleware';
import { CustomRequest } from '../middleware/auth.middleware';


const router = express.Router();

router.post("/signup", async (req,res)=>{
    await signup(req as Request , res);
})

router.post("/login" , async (req,res)=>{
    await login(req as Request , res);
})

router.post("/logout" , async (req,res)=>{
    await logout(req as Request , res);
})

router.put('/update-profile' , 
    async(req,res,next)=>{
        await protectRoute(req as CustomRequest , res , next);
    } ,
    async (req,res)=>{
        await updateProfile(req as Request , res);
});

router.get("/check" , 
    async(req,res,next)=>{
    await protectRoute(req as CustomRequest , res , next);
    } , 
    async (req,res)=>{
        await checkRoute(req as Request,res);
})

export default router;

