const express=require("express")
const { registerUser, checksEmail, verifypassword, ForgotPassword, resetPass } = require("../controllers/AuthController")
const { userDetails, Logout, updateUserDetails, SearchUser } = require("../controllers/userController")
const router=express.Router()




router
.post("/register",registerUser)
.post("/email",checksEmail)
.post("/password",verifypassword)
.post("/password",verifypassword)
.post("/forgot-pass",ForgotPassword)
.post("/reset-password",resetPass)

.get("/user-details",userDetails)
.get("/logout",Logout)
.patch("/update-user",updateUserDetails)
.post("/search-user", SearchUser)





module.exports= router