const UserModel = require("../models/UserModels")






module.exports={


   userDetails: async(req,res)=>{
    try {
        const token= req.cookies.token
        
    } catch (error) {
     return res.status(500).json({
         message: error.message || error,
         error: true
      })
    }

   },



}