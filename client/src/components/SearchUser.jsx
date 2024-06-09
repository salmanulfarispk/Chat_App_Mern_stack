import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";

export default function SearchUser() {
  
    const [searchuser,setSearchUser]=useState([])
    const [loading,setLoading]=useState(false)

  return (
    <div className='fixed inset-0 bg-slate-700 bg-opacity-40 p-2'>

           <div className='w-full max-w-lg mx-auto mt-10'>
                     <div className='bg-white rounded h-14 overflow-hidden flex'>
                        <input type='text'
                           placeholder='Search user by name,email....'
                           className='w-full outline-none p-1 h-full px-4'                            
                        />
                        <div className='h-14 w-14 flex items-center justify-center'>
                            <IoSearchOutline  size={23}/> 
                        </div>
                     </div>

                 {/**display search users */}
                 <div className='bg-white mt-2 w-full p-4'>

                 </div>

           </div>
          

    </div>
  )
}
