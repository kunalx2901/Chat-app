import { axiosInstance } from "../lib/axios"
import {useNavigate} from 'react-router-dom'
import {userAuthStore} from "../store/userAuthStore"
import { useState } from "react";
import Loader from "../components/Loader";

function HomePage() {
  const {checkAuth , isCheckingAuth , authUser} = userAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function sendRequest() {
    try {
      const response = await axiosInstance.post(`/auth/logout`);
      console.log(response.data);
      setLoading(true);
      if(response.status === 200){
        checkAuth();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
  if(loading){
    return <div>
      <Loader/>
    </div>
  }
  return (
    <div>
      <div>HomePage
        <br/>
      <button onClick={sendRequest} className="text-xl text-black border-2">{loading ? <Loader/> : "Logout"}</button>
      </div>
    </div>
    
  )
}

export default HomePage