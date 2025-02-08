import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';

interface UserAuthStore {
    checkAuth: ()=>void;
    isCheckingAuth: boolean;
    authUser: object | null;
  }

export const userAuthStore = create <UserAuthStore>((set)=>{
    return {
        authUser:null,
        isSigningUp:false,
        isLoggingUp:false,
        isUpdatingProfile:false,

        isCheckingAuth:true,

        checkAuth:async()=>{
            try {
                const res = await axiosInstance.get('/auth/check');
                toast.success("Successfully logged in");
                set({authUser:res})
                console.log(res);
            } catch (error) {
                set({authUser:null})
                console.log("error in checkAuth controller in frontend "+ error);  
                toast.error("Something went wrong"); 
            } finally{
                set({isCheckingAuth:false})
            }
        }
    }
})