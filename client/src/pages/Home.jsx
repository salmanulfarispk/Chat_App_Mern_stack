import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { Outlet, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUser } from '../redux/UserSlice';

export default function Home() {

   const navigate=useNavigate()
   const dispatch=useDispatch()
  const user=useSelector(state => state.user)
  // console.log("redux user",user)

   const fetchUserDetails= async()=>{
      const URL=`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user-details`
    try {
       
      const response=await axios.get(URL,{
        withCredentials: true
      });

        dispatch(setUser(response.data.data))

       if(response.data.logout){
        dispatch(logout())
        navigate("/emailpage")
       }
           
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message); 
    }
   }

   useEffect(()=>{
      fetchUserDetails()
   },[])
  return (
    <div>
         home
      <section>
      <Outlet/>  
      </section>
    </div>
  )
}
