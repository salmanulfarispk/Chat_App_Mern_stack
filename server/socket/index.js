const express=require("express")
const { Server } =require("socket.io")
const  http =require("http")
const app=express()
const  getUserFromUserDetails=require("../helpers/getUserDetailsFromToken")
const UserModel = require("../models/UserModels")
const ConversationModel= require("../models/ConversationModel")
const MessageModel=require("../models/MessageModel")

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
    onlineUser.add(user?._id?.toString())
   
    io.emit("onlineUser",Array.from(onlineUser))  //By using Array.from, the Set onlineUser is converted into an Array.

     socket.on("message-page",async(userId)=>{
        console.log("userId",userId);
        const userDetails= await UserModel.findById(userId).select("-password")

        const payload={
            _id: userDetails?._id,
            name: userDetails?.name,
            email: userDetails?.email,
            profileImg: userDetails?.profileImg,
            online: onlineUser.has(userId)

        }

        socket.emit('message-user',payload)
     });

     //new messages

     socket.on("new-message",async(data)=>{

        //check conversation is  available both user
        let conversation= await ConversationModel.findOne({
            "$or":[
                {sender : data?.sender, receiver: data?.receiver},
                {sender : data?.receiver, receiver: data?.sender},

            ]
        })

        if(!conversation){
            const createConversation=await ConversationModel({
                sender : data?.sender,
                receiver: data?.receiver
            })

            conversation=await createConversation.save()
        }

        const message= new MessageModel({
            text: data.text,
            imageUrl: data.imageUrl,
            videoUrl: data.videoUrl
        })

        const saveMessage=await message.save()
      
        const updateConversation=await ConversationModel.updateOne({_id: conversation._id},{
            "$push": {message : saveMessage._id}
        })

        const getConversation=await ConversationModel.findOne({
            "$or":[
                {sender : data?.sender, receiver: data?.receiver},
                {sender : data?.receiver, receiver: data?.sender},

            ]
        })
        


     });


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

