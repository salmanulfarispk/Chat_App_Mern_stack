import React, { useEffect, useState } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import Avatar from "./Avatar"
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from './SearchUser';


export default function Sidebar() {
   
    const userDetails= useSelector(state=> state?.user)
     const [editOpenUSer,setEditUserOpen]=useState(false)

     const [alluser,setAllUser]=useState([])
     const [openSearchUser,setOpenSearch]=useState(false)
     const socketconnection= useSelector(state=> state?.user?.socketConnection)
     

     useEffect(()=>{

      if(socketconnection){
        socketconnection.emit("sidebar",userDetails._id)
      }
        
     },[socketconnection])

     
  return (
    <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>
         <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between'>

               <div>
               <NavLink className={({isActive})=> `w-12 h-12 cursor-pointer flex justify-center items-center
                hover:bg-slate-200 rounded-sm ${isActive && "bg-slate-200"}`} title='chat'>
               <IoChatbubbleEllipses size={20}/>
               </NavLink>
               <div className='w-12 h-12 cursor-pointer flex justify-center items-center
                hover:bg-slate-200 rounded-sm' title='addfriend' onClick={()=> setOpenSearch(true)}>
               <FaUserPlus size={20}/>
               </div>   
               </div>
                   
                   <div className='flex flex-col items-center gap-2'>
                        <button className='mx-auto' title={userDetails?.name} onClick={()=> setEditUserOpen(true)}>
                            <Avatar width={38} height={38}
                             name={userDetails?.name}
                            image={userDetails?.profileImg}
                            userId={userDetails?._id}
                             /> 
                        </button>

                        <button title='logout' className='w-12 h-12 cursor-pointer flex justify-center items-center
                         hover:bg-slate-200 rounded-sm'>
                          <span className='-ml-2'><BiLogOut size={20}/></span>
                       </button>
                   </div>
         </div>

           <div className='w-full'>
              <div className='flex items-center h-16 '>
             <h2 className='text-xl font-bold p-4 text-slate-800'>Message</h2>
              </div>
               
               <div className='bg-slate-200 p-[0.5px]'></div>
              
               <div className='h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'> 
                 {
                  alluser.length === 0 && (
                    <div className='mt-12'>
                       <div className='flex items-center justify-center my-4 text-slate-500 '>
                       <FiArrowUpLeft size={50}/>
                       </div>
                        <p className='text-lg text-center text-slate-400'>Explore users to start a conversation with.</p>
                    </div>
                  )
                 }

               </div>

           </div>

           {/**edit userdetail modal */}
          {editOpenUSer && (
            <EditUserDetails onClose={()=> setEditUserOpen(false)} user={userDetails}/> 
          )}


          {/**search user option */}
          {
            openSearchUser && (
              <SearchUser onClose={()=> setOpenSearch(false)}/>
            )
          }

    </div>
  )
}
