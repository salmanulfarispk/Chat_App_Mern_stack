import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import LoadingSpinner from './LoadingSpinner';
import UserCard from './UserCard';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoClose } from "react-icons/io5";



export default function SearchUser({onClose}) {
  
    const [searchuser,setSearchUser]=useState([])  
    const [loading,setLoading]=useState(false)
    const [searchTerm,setSearchTerm]=useState('')

    const handleSearch=async()=>{

        const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/search-user`;
        
        try {
            setLoading(true)
            const response=await axios.post(URL,{
                search: searchTerm
            })
        
          
           setLoading(false)
           setSearchUser(response.data.data)


            
        } catch (error) {
           toast.error(error?.response?.data?.message || error.message,{
              position: 'top-right',
              style: {
                     background: 'red',
                     color: 'white',
                      },
              })
        }
    }


       useEffect(()=>{
          handleSearch()
       },[searchTerm])


    //    console.log("searchuser",searchuser);
      
  return (
    <div className='fixed inset-0 bg-slate-700 bg-opacity-40 p-2 z-10'>

           <div className='w-full max-w-lg mx-auto mt-10'>
                     <div className='bg-white rounded h-14 overflow-hidden flex' onSubmit={handleSearch}>
                        <input type='text'
                           placeholder='Search user by name,email....'
                           value={searchTerm}
                           onChange={(e)=> setSearchTerm(e.target.value)}
                           className='w-full outline-none p-1 h-full px-4'                            
                        />
                        <div className='h-14 w-14 flex items-center justify-center hover:scale-105 transition ease-in-out duration-200'>
                            <IoSearchOutline  size={23} className='cursor-pointer'/> 
                        </div>
                     </div>

                 {/**display search users */}
                 <div className='bg-white mt-2 w-full p-4 rounded'>
                     {
                        searchuser.length === 0 && !loading && (
                            <p className='text-center text-slate-500'>no user found!</p>
                        ) 
                     }

                     {
                         loading && (
                          <div><LoadingSpinner/></div>
                        )
                     }    

                        {/**when data is available */}
                     
                     {
                        searchuser.length !== 0 && !loading && (

                            searchuser.map((user,index)=>{
                                return (
                                    <UserCard key={user._id} user={user} onClose={onClose}/>
                                )

                            })
                            
                       )
                     }
                        
                 </div>
           </div>

           <div className='absolute top-0 right-5 text-2xl p-2  lg:text-4xl hover:text-white'>
            <button>
           <IoClose onClick={onClose}/> 
            </button>
           </div>
    </div>
  )
}
