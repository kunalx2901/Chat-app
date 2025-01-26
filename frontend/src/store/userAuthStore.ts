import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'

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
                const res = await axiosInstance.get('/check');
                set({authUser:res.data})
            } catch (error) {
                set({authUser:null})
                console.log("error in checkAuth controller "+ error);   
            } finally{
                set({isCheckingAuth:false})
            }
        }
    }
})