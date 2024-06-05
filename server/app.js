const express=require("express")
const cors=require("cors")
const app=express()
require('dotenv').config()
const connectDB=require("./config/DBconnect")
const PORT=process.env.PORT || 8080
const Routes=require("./routes/AllRoutes")
const cookieParser=require("cookie-parser")

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/",Routes)


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("server running on",PORT);
    })
})

