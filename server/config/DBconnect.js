const { error } = require("console")
const mongoose=require("mongoose")


const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        
        const connection= mongoose.connection;
         connection.on("connection",()=>{
            console.log("Connect to DB");
        })

         connection.on("error",(error)=>{
            console.log("something is wrong in mongodb",error);
        })
        
    } catch (error) {
        console.log("something went wrong ",error);
    }
}


module.exports=connectDB