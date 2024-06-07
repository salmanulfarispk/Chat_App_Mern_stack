import React from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import Avatar from "./Avatar"
import { useSelector } from 'react-redux';


export default function Sidebar() {
   
    const userDetails= useSelector(state=> state?.user)
    console.log(userDetails);

  return (
    <div className='w-full h-full'>
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
                   
                   <div className='flex flex-col items-center'>
                        <button className='mx-auto' title={userDetails?.name}>
                            <Avatar width={38} height={38}
                             name={userDetails?.name}/>
                            <div>

                            </div>
                        </button>

                        <button title='logout' className='w-12 h-12 cursor-pointer flex justify-center items-center
                         hover:bg-slate-200 rounded-sm'>
                          <span className='-ml-2'><BiLogOut size={20}/></span>
                       </button>
                   </div>
         </div>

    </div>
  )
}
