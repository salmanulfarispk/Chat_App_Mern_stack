import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from "react-router-dom"
import Avatar from "./Avatar"
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { MdVideoCameraBack } from "react-icons/md";
import uploadFile  from "../helpers/uploadFile"
import { IoClose } from "react-icons/io5";
import LoadingSpinner from "./LoadingSpinner"
import backgroundImage from "../assets/bb.jpeg"
import { IoMdSend } from "react-icons/io";


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
  const [message,setMessage]=useState({
     text:"",
     imageUrl:"",
     videoUrl:""
  })
  const[loading,setLoading]=useState(false) 

  
  const socketconnection= useSelector(state=> state?.user?.socketConnection)

  const handleUploadImage=async (e)=>{
      const file= e.target.files[0]
      setLoading(true)
      const uploadimageUrl= await uploadFile(file)
      setLoading(false)
      setOpenImgVid(false)
      if (uploadimageUrl) {
        setMessage((prev) => ({
          ...prev,
          imageUrl: uploadimageUrl
        }));
      } else {
        console.error('Failed to upload image');
      }
  }
 
  const handleClearuploadImg=()=>{
    setMessage((prev) => ({
      ...prev,
      imageUrl: ""
    }));
  }
  

  const handleUploadVideo=async(e)=>{
    const file= e.target.files[0]
     setLoading(true)
      const uploadVideo= await uploadFile(file)
      setLoading(false) 
      setOpenImgVid(false)
      setMessage((prev)=>{
        return {
          ...prev,
          videoUrl : uploadVideo
        }
      })
  }

  const handleClearuploadVideo=()=>{
    setMessage((prev) => ({
      ...prev,
      videoUrl: ""
    }));
  }


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


  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setMessage((prev) => ({
      ...prev,
      text: value,
    }));
  };


  const handleSendMessage=(e)=>{
       e.preventDefault();
       if(message.text || message.imageUrl || message.videoUrl){
        if(socketconnection){
           socketconnection.emit("new-message",{
             sender: user?._id,
             receiver: params.userId,
             text: message.text,
             imageUrl: message.imageUrl,
             videoUrl: message.videoUrl
           })
        }
       }

       setMessage({
        text:"",
        imageUrl:"",
        videoUrl:""
       })
  }

  return (
    <div style={{backgroundImage : `url(${backgroundImage})`}} className='bg-no-repeat bg-cover'>
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

      <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll 
      scrollbar relative bg-slate-200 bg-opacity-70'>
           
            {/**display image message */}
        {
          message.imageUrl && (
            <div className='w-full h-full bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
            <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-gray-100'
            onClick={handleClearuploadImg}>
              <IoClose size={30} className='hover:scale-125'/>
              </div>
            <div className='bg-white p-3'>
              <img src={message.imageUrl} alt='upload-image'
              className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
              />
            </div>
         </div>
          ) 
        }


        {/**display video message */}
        {
          message.videoUrl && (
            <div className='w-full h-full bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
            <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-gray-100'
            onClick={handleClearuploadVideo}>
              <IoClose size={30} className='hover:scale-125'/>
              </div>
            <div className='bg-white p-3'>
              <video src={message.videoUrl}
              controls
              muted
              autoPlay
              className='aspect-video w-full h-full max-w-sm m-2'
              />
            </div>
         </div>
          ) 
        }

        {
          loading && (
            <div className='w-full h-full flex justify-center items-center '>
              <LoadingSpinner/>
            </div>
          )
        }


        Show all messages 
      </section>
       
      {/** send message  */}
       <section className='h-16 bg-white flex items-center px-3'>
       <div className='relative'>
            <button className='flex justify-center items-center w-11 h-11 
            rounded-full hover:bg-primary hover:text-white animate-pulse 
            hover:animate-none' onClick={()=> setOpenImgVid(prev=> !prev)}>
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

                  <input type='file'
                  id='uploadimage'
                  onChange={handleUploadImage}
                  className='hidden'
                  />
                   <input type='file'
                  id='uploadvideo'
                  onChange={handleUploadVideo}
                  className='hidden'
                  />

                </form>
             </div>
              )
            }
        
            
          </div>

      {/** input/send messages   */}
         <form className='h-full w-full flex gap-2' onSubmit={handleSendMessage}>
          <input type='text'
            placeholder='Type here message...'
            value={message.text}
            onChange={handleOnchange}
            className='py-1 px-4 outline-none w-full h-full'
          />

          <button className='text-primary hover:text-secondary'>
              <IoMdSend size={28}/>
            </button>
        </form>

       </section>
          
    </div>
  )
}

export default Message