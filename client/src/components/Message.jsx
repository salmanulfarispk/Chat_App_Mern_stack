import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom"


function Message() {
   
  const params=useParams()
  // console.log(params.userId);
  const socketconnection= useSelector(state=> state?.user?.socketConnection)


  useEffect(()=>{
    if(socketconnection){
      socketconnection.emit("message-page",params.userId)
    }

     socketconnection.on("message-user",(data)=>{
         console.log("data",data);
     })

  },[socketconnection,params])

  return (
    <div>Message apge</div>
  )
}

export default Message