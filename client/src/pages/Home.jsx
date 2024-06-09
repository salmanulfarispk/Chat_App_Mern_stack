import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch } from 'react-redux';
import { logout, setUser } from '../redux/UserSlice';
import Sidebar from '../components/Sidebar';
import logo from "../assets/logo.png"


export default function Home() {

   const navigate=useNavigate()
   const dispatch=useDispatch()
   const location=useLocation()


   const fetchUserDetails= async()=>{
      const URL=`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user-details`
    try {
       
      const response=await axios.get(URL,{
        withCredentials: true
      });

        dispatch(setUser(response.data.data))

       if(response.data.data.logout){
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

   const basePath= location.pathname === '/'

  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
         <section className={`bg-white  ${!basePath && "hidden"} lg:block`}>
           <Sidebar/>
         </section>
         
      <section className={`${basePath && "hidden"}`}>
      <Outlet/>  
      </section>

      
        <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex" }`}>
          <div>
            <img src={logo} alt='logo' width={250} />
          </div>
          <p className='text-lg mt-2 text-slate-500 ms-5'>select user to send message!</p>
        </div>
    

    </div>
  )
}
