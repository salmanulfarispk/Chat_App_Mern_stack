import React, { useState } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import Avatar from "./Avatar"
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';


export default function Sidebar() {
   
    const userDetails= useSelector(state=> state?.user)
     const [editOpenUSer,setEditUserOpen]=useState(false)

  return (
    <div className='w-full h-full grid grid-cols-[48px,1fr]'>
         <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between'>

               <div>
               <NavLink className={({isActive})=> `w-12 h-12 cursor-pointer flex justify-center items-center
                hover:bg-slate-200 rounded-sm ${isActive && "bg-slate-200"}`} title='chat'>
               <IoChatbubbleEllipses size={20}/>
               </NavLink>
               <div className='w-12 h-12 cursor-pointer flex justify-center items-center
                hover:bg-slate-200 rounded-sm' title='addfriend'>
               <FaUserPlus size={20}/>
               </div>   
               </div>
                   
                   <div className='flex flex-col items-center gap-2'>
                        <button className='mx-auto' title={userDetails?.name} onClick={()=> setEditUserOpen(true)}>
                            <Avatar width={38} height={38}
                             name={userDetails?.name}
                            image={userDetails?.profileImg}
                             /> 
                        </button>

                        <button title='logout' className='w-12 h-12 cursor-pointer flex justify-center items-center
                         hover:bg-slate-200 rounded-sm'>
                          <span className='-ml-2'><BiLogOut size={20}/></span>
                       </button>
                   </div>
         </div>

           <div className='w-full'>
                 message
           </div>

           {/**edit userdetail modal */}
          {editOpenUSer && (
            <EditUserDetails onClose={()=> setEditUserOpen(false)} user={userDetails}/>
          )}
    </div>
  )
}
