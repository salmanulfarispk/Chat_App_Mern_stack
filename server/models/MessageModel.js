const mongoose=require("mongoose")
const { type } = require("os")


const MessageSchema= new mongoose.Schema({
     text:{
        type:String,
        default: ""
     },
     imageUrl:{
        type:String,
        default: ""
     },
     videoUrl:{
        type:String,
        default: ""
     },
     seen:{
        type:Boolean,
        default: false
     },  

},{
    timestamps:true
})



const MessageModel= mongoose.model("Message",MessageSchema)

module.exports= MessageModel