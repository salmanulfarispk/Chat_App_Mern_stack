const express=require("express")
const { Server } =require("socket.io")
const  http =require("http")
const app=express()
const  getUserFromUserDetails=require("../helpers/getUserDetailsFromToken")
const UserModel = require("../models/UserModels")
const ConversationModel= require("../models/ConversationModel")
const MessageModel=require("../models/MessageModel")
const getConversation = require("../helpers/getConversation")

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

io.on("connection",async(socket)=> {


  console.log("connected user",socket.id);  

  const token= socket.handshake.auth.token;

  //corrent user details

  const user=  await getUserFromUserDetails(token)

    //create a room 
  
    socket.join(user?._id.toString())
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

         //get previous message
         const getConversationMessage=await ConversationModel.findOne({
            "$or":[
                {sender : user?._id, receiver: userId},
                {sender : userId, receiver: user?._id},

            ]
        }).populate("message").sort({updatedAt : -1}) 

        socket.emit("message",getConversationMessage?.message || [])
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
            videoUrl: data.videoUrl,
            msgByUserId :  data?.msgByUserId,
        })

        const saveMessage=await message.save()
      
        const updateConversation=await ConversationModel.updateOne({_id: conversation._id},{
            "$push": {message : saveMessage._id}
        })
        const getConversationMessage = await ConversationModel.findOne({
            "$or" : [
                { sender : data?.sender, receiver : data?.receiver },
                { sender : data?.receiver, receiver :  data?.sender}
            ]
        }).populate('message').sort({ updatedAt : -1 })


        io.to(data?.sender).emit('message',getConversationMessage?.message || [])
        io.to(data?.receiver).emit('message',getConversationMessage?.message || [])

        //send conversation into sidebar
        const conversationSender = await getConversation(data?.sender)
        const conversationReceiver = await getConversation(data?.receiver)

        
        io.to(data?.sender).emit('conversation',conversationSender)
        io.to(data?.receiver).emit('conversation',conversationReceiver)

     });

     //sidebar

     socket.on("sidebar",async(currentUserId)=>{

           const conversation = await getConversation(currentUserId)
            socket.emit("conversation",conversation)
     })

     socket.on("seen",async(messageByUserId)=>{
        let conversation= await ConversationModel.findOne({
            "$or":[
                {sender : user?._id, receiver: messageByUserId},
                {sender : messageByUserId, receiver: user?._id},

            ]
        });

        const conversationMessageId = conversation.message || [];

        const upadteMessage = await MessageModel.updateMany(
            {
                _id: {"$in" : conversationMessageId},
                msgByUserId : messageByUserId
            },{
                "$set": { seen : true}
            }
        )

        const conversationSender = await getConversation(user?._id?.toString())
        const conversationReceiver = await getConversation(messageByUserId)

        
        io.to(user?._id?.toString()).emit('conversation',conversationSender)
        io.to(messageByUserId).emit('conversation',conversationReceiver)

     
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

