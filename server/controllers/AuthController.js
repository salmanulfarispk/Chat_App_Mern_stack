const { error } = require("console");
const UserModel = require("../models/UserModels");
const bcrypt= require("bcryptjs")


async function registerUser(req,res){
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

}




module.exports= registerUser