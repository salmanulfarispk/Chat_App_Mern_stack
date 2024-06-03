const mongoose=require("mongoose")
const { type } = require("os")

const ConversationSchema= new mongoose.Schema({
      sender:{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'   // Reference to the User model and easier to work with populate method
      },
      receiver:{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
      },
      message:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Message'
        }
      ]

},{
    timestamps:true
})


const ConversationModel= mongoose.model("Conversation",ConversationSchema)

module.exports= ConversationModel