import React, { useEffect, useState } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import Avatar from "./Avatar"
import { useDispatch, useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from './SearchUser';
import { FaImage } from "react-icons/fa6";
import { MdVideoCameraBack } from "react-icons/md";
import { logout } from '../redux/UserSlice';


export default function Sidebar() {
   
    const user= useSelector(state=> state?.user)
     const [editOpenUSer,setEditUserOpen]=useState(false)

     const [alluser,setAllUser]=useState([])
     const [openSearchUser,setOpenSearch]=useState(false)
     const socketconnection= useSelector(state=> state?.user?.socketConnection)
     const dispatch=useDispatch()
     const navigate=useNavigate()

     useEffect(() => {
      if (socketconnection) {
          socketconnection.emit('sidebar', user._id);
    
          socketconnection.on('conversation', (data) => {
    
          const conversationUserData = data.map((conversationUser) => {
            if (conversationUser?.sender?._id === conversationUser?.receiver?._id) {
              return {
                ...conversationUser,
                userDetails: conversationUser?.sender
              };
            } else if (conversationUser?.receiver?._id !== user?._id) {
              return {
                ...conversationUser,
                userDetails: conversationUser.receiver
              };
            } else {
              return {
                ...conversationUser,
                userDetails: conversationUser.sender
              };
            }
          });
    
          setAllUser(conversationUserData);
        });
      }
    
      return () => {
       
        if (socketconnection) {
          socketconnection.off('conversation');
        }
      };
    }, [socketconnection,user]);


    const handleLogout=()=>{
      dispatch(logout())
      navigate("/emailpage")
      localStorage.removeItem('token')
    }
    
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
                        <button className='mx-auto' title={user?.name} onClick={()=> setEditUserOpen(true)}>
                            <Avatar width={38} height={38}
                             name={user?.name}
                            image={user?.profileImg}
                            userId={user?._id}
                             /> 
                        </button>

                        <button title='logout' className='w-12 h-12 cursor-pointer flex justify-center items-center
                         hover:bg-slate-200 rounded-sm hover:scale-105' onClick={handleLogout}>
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

                 {
                  alluser.map((conv,index)=>(
                    <Link to={""+ conv?.userDetails?._id} key={conv?._id} className='flex items-center gap-2 py-3 px-2 border 
                    border-transparent hover:border-primary hover:bg-slate-100 hover:cursor-pointer'>
                      <div>
                        <Avatar 
                         image={conv?.userDetails?.profileImg}
                         name={conv?.userDetails?.name} 
                         height={40} width={40}
                        />
                      </div>
                      <div>
                        <h3 className='text-ellipsis line-clamp-1 font-semibold text-base'>{conv?.userDetails?.name}</h3>
                        <div className='text-slate-500 text-xs flex items-center gap-1'>
                          <div className='flex items-center gap-1'>
                            {
                              conv?.lastMsg?.imageUrl && (
                                 <div className='flex items-center gap-1'>
                                  <span><FaImage/></span>
                                  {!conv?.lastMsg?.text && <span>image</span>}
                                  </div>
                              )
                            }
                            {
                                conv?.lastMsg?.videoUrl && (
                                  <div className='flex items-center gap-1'>
                                  <span><MdVideoCameraBack/></span>
                                  {!conv?.lastMsg?.text && <span>video</span>}
                                  </div>
                                )
                            }
                          </div>
                          <p className='text-ellipsis line-clamp-1'>{conv?.lastMsg?.text}</p>
                        </div>
                      </div>
                      {conv?.unseenMsg ? (
                      <p className='text-xs w-6 flex justify-center items-center h-6 ml-auto p-1 bg-primary
                       text-white rounded-full font-semibold'>{conv?.unseenMsg}</p>): ("")
                      }
                    </Link>
                  ))
                  
                 }
               </div>

           </div>

           {/**edit userdetail modal */}
          {editOpenUSer && (
            <EditUserDetails onClose={()=> setEditUserOpen(false)} user={user}/> 
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
