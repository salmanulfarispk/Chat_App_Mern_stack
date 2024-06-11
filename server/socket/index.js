const express=require("express")
const { Server } =require("socket.io")
const  http =require("http")
const app=express()
const  getUserFromUserDetails=require("../helpers/getUserDetailsFromToken")


//socket connection

const server= http.createServer(app)
const io= new Server(server,{
    cors:{
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
})


//socket running on http://localhost:8080

io.on("connection",async(socket)=>{
    
  console.log("connected user",socket.id);  

  const token= socket.handshake.auth.token;

  //corrent user details

  const user=  await getUserFromUserDetails(token)

    //create a room 
  
    socket.join(user._id)



    //disconnect
    io.on("disconnect",()=>{
        console.log('disconnect user',socket.id);
    })
})


module.exports={
    app,
    server
}

