const express=require("express")
const { Server } =require("socket.io")
const  http =require("http")
const app=express()
const  getUserFromUserDetails=require("../helpers/getUserDetailsFromToken")
const UserModel = require("../models/UserModels")


//socket connection

const server= http.createServer(app)
const io= new Server(server,{
    cors:{
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
})


const onlineUser=new Set();  //used to create a new Set object. A Set is a collection of values where each value must be unique.meaning that no two values in a Set can be the same

//socket running on http://localhost:8080

io.on("connection",async(socket)=>{
  console.log("connected user",socket.id);  

  const token= socket.handshake.auth.token;

  //corrent user details

  const user=  await getUserFromUserDetails(token)

    //create a room 
  
    socket.join(user?._id)
    onlineUser.add(user?._id)
   
    io.emit("onlineUser",Array.from(onlineUser))  //By using Array.from, the Set onlineUser is converted into an Array.

     socket.on("message-page",async(userId)=>{
        console.log("userId",userId);
        const userDetails= await UserModel.findById(userId).select("-password")

        const payload={
            _id: userDetails?._id,
            name: userDetails?.name,
            email: userDetails?.email,
            online: onlineUser.has(userId)

        }

        socket.emit('message-user',payload)
     })


    //disconnect
    socket.on("disconnect",()=>{
        onlineUser.delete(user?._id)
        console.log('disconnect user',socket.id);
    })
})


module.exports={
    app,
    server
}

