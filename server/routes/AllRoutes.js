const express=require("express")
const { registerUser, checksEmail, verifypassword } = require("../controllers/AuthController")
const { userDetails, Logout, updateUserDetails } = require("../controllers/userController")
const router=express.Router()




router
.post("/register",registerUser)
.post("/email",checksEmail)
.post("/password",verifypassword)

.get("/user-details",userDetails)
.get("/logout",Logout)
.patch("/update-user",updateUserDetails)





module.exports= router