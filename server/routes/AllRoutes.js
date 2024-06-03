const express=require("express")
const { registerUser, checksEmail, verifypassword } = require("../controllers/AuthController")
const router=express.Router()




router
.post("/register",registerUser)
.post("/email",checksEmail)
.post("/password",verifypassword)




module.exports= router