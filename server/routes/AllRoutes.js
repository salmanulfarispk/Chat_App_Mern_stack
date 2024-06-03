const express=require("express")
const { registerUser, checksEmail } = require("../controllers/AuthController")
const router=express.Router()




router
.post("/register",registerUser)
.post("/email",checksEmail)




module.exports= router