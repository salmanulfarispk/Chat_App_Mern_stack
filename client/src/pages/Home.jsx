import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { Outlet, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch } from 'react-redux';
import { logout, setUser } from '../redux/UserSlice';
import Sidebar from '../components/Sidebar';

export default function Home() {

   const navigate=useNavigate()
   const dispatch=useDispatch()
  
 

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
      toast.error(error?.response?.data?.message || error.message ,{
        position: 'top-right',
        style: {
               background: 'red',
              color: 'white',
              },
      }); 
    }
   }

   useEffect(()=>{
      fetchUserDetails()
   },[])

  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
         <section className='bg-white'>
           <Sidebar/>
         </section>
         
      <section>
      <Outlet/>  
      </section>

    </div>
  )
}
