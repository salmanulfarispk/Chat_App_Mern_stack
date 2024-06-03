const express=require("express")
const cors=require("cors")
const app=express()
require('dotenv').config()
const connectDB=require("./config/DBconnect")
const PORT=process.env.PORT || 8080

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("server running on",PORT);
    })
})

