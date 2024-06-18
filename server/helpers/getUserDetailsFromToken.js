 const jwt=require("jsonwebtoken");
const UserModel = require("../models/UserModels");

const getUserFromUserDetail= async(token)=>{
     if(!token){
        return {
            message:"session out or Unauthorized: No Token Provided ",
            logout: true,
        }
     }
   
     try{
     const decode= await jwt.verify(token,process.env.JWT_SECRET_KEY)
     if (!decode) {
        return res.status(401).json({ error: "Unauthorized: Invalid Token" });
    }

    const user= await UserModel.findById(decode.id).select("-password")
    
    return user;
}catch(err){
    if (err.name === 'TokenExpiredError') {
        return { error: 'TokenExpiredError' };
    }
    return {
        message: "Unauthorized: Invalid Token",
        logout: true,
    };
}
} 


module.exports= getUserFromUserDetail