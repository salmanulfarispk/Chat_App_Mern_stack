const mongoose=require("mongoose")
const { type } = require("os")

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required: [true,"provide name"]
    },
    email:{
        type:String,
        required: [true,"provide email"],
        unique: true       //When you set the email field to be unique, you are enforcing a constraint that no two records can have the same email address.
    },
    password:{
        type:String,
        required:[true,"provide password"]
    },
    profileImg:{
        type:String,
        default:"",
    }

},{
    timestamps:true
})


const UserModel= mongoose.model("User",UserSchema)

module.exports= UserModel