import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import Avatar from "./Avatar"

function Message() {
   
  const params=useParams()
  // console.log(params.userId);
  const [datauser,setDataUser]=useState({
    name:"",
    email:"",
    profileImg:"",
    online: false
  })
  const socketconnection= useSelector(state=> state?.user?.socketConnection)


  useEffect(()=>{
    if(socketconnection){
      socketconnection.emit("message-page",params.userId)
    }

     socketconnection.on("message-user",(data)=>{
         setDataUser(data)
     })

  },[socketconnection,params?.userId])

  return (
    <div>
      <header className='sticky top-0 h-16 bg-white'>
          <div>
            <div>
              <Avatar height={40} width={40} 
              userId={datauser?._id} 
              name={datauser?.name} 
              image={datauser?.profileImg}
              />
            </div>
          </div>
      </header>
    </div>
  )
}

export default Message