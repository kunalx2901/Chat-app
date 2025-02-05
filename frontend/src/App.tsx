import { useEffect } from 'react'
import {Routes , Route} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage' 
import LoginPage from './pages/LoginPage'
import SettingPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage'
import { userAuthStore } from './store/userAuthStore'
import Loader from './components/Loader'
import {Navigate} from 'react-router-dom' 



function App() {
  const {checkAuth , isCheckingAuth , authUser} = userAuthStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth]);

  console.log(authUser);

  if(isCheckingAuth ){
    return <Loader/>
  }

  return <div>
    <div className='text-5xl font-bold text-green-500'>
    <Navbar/>
  <Routes>
    <Route path='/' element={authUser ? <HomePage/> : <Navigate to='/login'/>}/>
    <Route path='/signup' element={!authUser ? <SignupPage/> : <Navigate to='/'/>}/>
    <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to='/'/>}/>
    <Route path='/setting' element={<SettingPage/>}/>
    <Route path='/profile' element={authUser ? <ProfilePage/> : <LoginPage/>}/>
  </Routes>
    </div>

  </div>
}

export default App
