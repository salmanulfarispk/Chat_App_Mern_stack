const { error } = require("console");
const UserModel = require("../models/UserModels");
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");
const  sendMail = require("../helpers/sendMail");



module.exports={

   registerUser:async(req,res)=>{
    try {
        const {name,email,password,profileImg}=req.body;

        const checkemail= await UserModel.findOne({email})   // // Check if a user with the given email already exists
        if(checkemail){
            return res.status(400).json({
                message: "user already Exists",
                error: true,
            })
        }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword= await bcrypt.hash(password,salt)
        
      const newUser= new UserModel({
          name,
          email,
          password:hashedPassword,
          profileImg,
      })

        
      await newUser.save()

      return res.status(201).json({
        message: "User created successfully",
        success:true,
        data: newUser,
        error: false

      });
        
    } catch (error) {
      return res.status(500).json({
        message: error.message || error,
        error: true
      })
}

},
 
  //Login as checkemail and then compare password

   checksEmail: async(req,res)=>{
    try {
       
        const {email}=req.body;
         
        const checkEmail= await UserModel.findOne({email}).select("-password")  //the password is not included in the returned user data for security reasons
        if(!checkEmail){
            return res.status(400).json({
                message:"user not found",
                error: true
            })
        }
        

        return res.status(200).json({
           message:"email verify",
           success: true,
           data: checkEmail
        })
        
        
    } catch (error) {
      return res.status(500).json({
        message: error.message || error,
        error: true
         })
    }
},


verifypassword:async(req,res)=>{
    try {
        const {password,userId}=req.body;

        const user=await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true
            });
        }

        const passwordVerify= await bcrypt.compare(password,user.password)
        if (!passwordVerify) {
            return res.status(401).json({
                message: "Invalid password",
                error: true
            });
        }

        const tokenData={
            id: user._id,
            email: user.email
        }
        const token=await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{ expiresIn: '1d' }) //generatesToken
        const CookieOption={
            http: true,
            secure: true,
        }

        return res.cookie("token",token,CookieOption).status(200).json({  //token  stores in cokkie
            message:"Login succesfull",
            token: token,
            success: true
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
             })
    }
},

  //Forgot-password

  ForgotPassword:async(req,res)=>{
    try {
      const {email}=req.body;
      const user=await UserModel.findOne({email})

      if(!user){
        return res.status(404).json({
            message: "No user with this email"
        })
      }

      const token= jwt.sign({email},process.env.FORGOT_PASS,{ expiresIn: '10m' })
      const data={
        email,
        token
      }

      await sendMail("Chat App",data);

      const resetPasswordExpire = new Date();
        resetPasswordExpire.setMinutes(resetPasswordExpire.getMinutes() + 15); 

       user.resetPasswordToken = token;
       user.resetPasswordExpire = resetPasswordExpire;
       await user.save();

       res.status(200).json({
           message:"Reset Password Link is Send To Your Mail",
           success: true,
       });

        
    } catch (error) {
     return res.status(500).json({
        message: error.message || error,
        error: true
     }) 
    }
  },

   //Resetting Password 
   resetPass:async(req,res)=>{
    try {

        const {token,password}=req.body;
          

        if (!token) {
            return res.status(400).json({
              message: "Invalid or expired token",
              error: true
            });
          }

          const decodedToken= jwt.verify(token,process.env.FORGOT_PASS);
          const user= await UserModel.findOne({
             email: decodedToken.email,
             resetPasswordToken: token,
             resetPasswordExpire: { $gt: Date.now() }
          })

          if (!user) {
            return res.status(400).json({
              message: "Invalid or expired token",
              error: true
            });
          };

          const salt=await bcrypt.genSalt(10);
          const hashedPassword= await bcrypt.hash(password,salt)

          user.password = hashedPassword;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;

      await user.save();

      return res.status(200).json({
        message: "Password reset successfully",
        success: true
      });
        
    } catch (error) {
      return res.status(500).json({
        message: error.message || error,
         error: true
       })     
    }
   }






}



