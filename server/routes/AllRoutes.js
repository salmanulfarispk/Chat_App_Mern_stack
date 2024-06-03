const express=require("express")
const registerUser = require("../controllers/AuthController")
const router=express.Router()




router.post("/register",registerUser)




module.exports= router