const messageModel = require('../models/message.models')
const msgModel = require('../models/message.models')
const userModel = require('../models/user.models')
module.exports.addMsg=async(req , res)=>{
    const {message,userId}=req.body
   let user = await userModel.findById(userId)

   if(!user){
    res.json({message:"user not found"})
   }else{
    await msgModel.insertMany({message,userId})
    res.json({message:"success"})
   }
}   

module.exports.getMsg = async (req,res)=>{
    const userId = req.header("userId");
    let mesg = await messageModel.find({userId});
    res.json({message:"success" , mesg})
}