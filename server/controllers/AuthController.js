const { error } = require("console");
const UserModel = require("../models/UserModels");
const bcrypt= require("bcryptjs")



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

      const hashedPassword= await bcrypt.hash(password,10)
        
      const newUser= new UserModel({
          name,
          email,
          password:hashedPassword,
          profileImg,
      })

        
      await newUser.save()

      return res.status(201).json({
        message: "User created successfully",
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
                message:"Email not found",
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





}



