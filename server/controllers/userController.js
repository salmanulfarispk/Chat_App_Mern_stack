const getUserFromUserDetail = require("../helpers/getUserDetailsFromToken")
const UserModel = require("../models/UserModels")






module.exports={


   userDetails: async(req,res)=>{
    try {
        const token= req.cookies.token || ""

        const user=await getUserFromUserDetail(token)

        return res.status(200).json({
            message:"user details",
            data: user
        }) 
        
    } catch (error) {
     return res.status(500).json({
         message: error.message || error,
         error: true
      })
    }

   },


    //userLogout

    Logout:async(req,res)=>{
        try {

            const CookieOption={
                http: true,
                secure: true,
            }

            return res.cookie("token","",CookieOption).status(200).json({    //here set token as ""
                message:"session out ",
                success: true
            })
            
        } catch (error) {
         return res.status(500).json({
            message: error.message || error,
            error: true
         })   
        }
    },

    updateUserDetails: async(req,res)=>{
        try {
          
            const token= req.cookies.token || ""

            const user=await getUserFromUserDetail(token)
            const {name,profileImg}=req.body;

            const updateUser=await  UserModel.updateOne({_id: user._id},{
                name,
                profileImg
            })

            const updatedUserInfo=await UserModel.findById(user._id)

            return res.status(201).json({
                message:"user updated succesfully",
                data: updatedUserInfo,
                success:true
            })


            
        } catch (error) {
            return res.status(500).json({
                message: error.message || error,
                error: true
             })   
        }
    },






}