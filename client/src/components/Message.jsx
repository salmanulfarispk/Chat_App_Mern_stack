import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from "react-router-dom"
import Avatar from "./Avatar"
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { MdVideoCameraBack } from "react-icons/md";

function Message() {
   
  const params=useParams()
  // console.log(params.userId);
  const user=useSelector(state=> state?.user)
  const [datauser,setDataUser]=useState({
    _id:"",
    name:"",
    email:"",
    profileImg:"",
    online: false
  })
  const [openImgVid,setOpenImgVid]=useState(false)
  const socketconnection= useSelector(state=> state?.user?.socketConnection)


  useEffect(()=>{
    if(!socketconnection) return ;

      socketconnection.emit("message-page",params.userId)

     socketconnection.on("message-user",(data)=>{
         setDataUser(data)
     })

     return () => {
      socketconnection.off('message-user', (data)=>{
        setDataUser(data)
      });
    };

  },[socketconnection,params?.userId,user])

  return (
    <div>
      <header className='sticky top-0 h-16 bg-white flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            <Link to={"/"} className='lg:hidden text-slate-500'><FaAngleLeft  size={25}/></Link>
            <div className='ms-1 mt-1'>
              <Avatar height={50} width={50} 
              userId={datauser?._id} 
              name={datauser?.name} 
              image={datauser?.profileImg}
              />
            </div>

            <div>
              <h3 className='font-semibold text-lg my-0 text-ellipsis line-clamp-1'>{datauser?.name}</h3>
              <p className='-my-2 text-sm'>
                {
                  datauser.online ? <span className='text-green-600'>online</span> : <span className='text-slate-400'>offline</span>
                }
              </p>
            </div>
          </div>

          <div className='me-2'>
            <button className='cursor-pointer hover:text-primary'>
            <HiDotsVertical size={23}/>
            </button>
          </div>
      </header>


      {/**show all message  */}

      <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar'>
        Show all messages 
      </section>
       
      {/** send message  */}

       <section className='h-16 bg-white flex items-center px-3'>
       <div className='relative'>
            <button className='flex justify-center items-center w-11 h-11 
            rounded-full hover:bg-primary hover:text-white' onClick={()=> setOpenImgVid(prev=> !prev)}>
            <FaPlus size={20}/>
            </button>

        {/** video and image  */}
            {
              openImgVid && (
                <div className='bg-white shadow rounded absolute bottom-14 w-36 p-2'>
                <form>
                  <label htmlFor='uploadimage' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 rounded-sm cursor-pointer'>
                   <div className='text-primary'>
                      <FaImage size={18}/>
                   </div>
                   <p>Photo</p>
                  </label>
 
                  <label htmlFor='uploadvideo' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 rounded-sm cursor-pointer'>
                   <div className='text-purple-600'>
                      <MdVideoCameraBack size={22}/>
                   </div>
                   <p>video</p>
                  </label>
                </form>
             </div>
              )
            }
        
            
          </div>
       </section>
        
    </div>
  )
}

export default Message