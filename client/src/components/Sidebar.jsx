import React from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";


export default function Sidebar() {
  return (
    <div className='w-full h-full'>
         <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5'>
               <div className='w-12 h-12 cursor-pointer flex justify-center items-center
                hover:bg-slate-200 rounded-sm' title='chat'>
               <IoChatbubbleEllipses size={25}/>
               </div>
               <div className='w-12 h-12 cursor-pointer flex justify-center items-center
                hover:bg-slate-200 rounded-sm' title='adduser'>
               <FaUserPlus size={25}/>
               </div>
         </div>

    </div>
  )
}
