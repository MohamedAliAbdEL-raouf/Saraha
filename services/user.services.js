const userModel = require('../models/user.models')
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const { sendEmail } = require('../mails/user.mails');

module.exports.signUp=async(req,res)=>{
  
    const {name , email , password , age} =req.body
    let user = await userModel.findOne({email});
    if(user){
        res.json({message:"account already exsits"})
    }else{
        bcrypt.hash(password,3,async(err,hash)=>{
            await userModel.insertMany({name , email , password:hash , age})
          let token = jwt.sign({email},'secret',{expiresIn:60})
            sendEmail({email,token , message:"hello"})
            res.json({message:"success"})
        })

    }
   
}

module.exports.signIN=async(req,res)=>{
    const { email , password} =req.body
    let user = await userModel.findOne({email})
    if(user){
        const match = await bcrypt.compare(password , user.password);
        if(match){
         let token = jwt.sign({userId:user._id, name:user.name , emailConfirm:user.emailConfirm} , 'secret' )
         if(user.emailConfirm==true){
            res.json({message:"success" , token})
         }else{
            res.json({message:"verify first"})
         }
            
        }else{
            res.json({message:"Incorrect Password"})
        }
    }else{
        res.json({message:"Email Doesn't Exist"})

    
    }
}


module.exports.emailVerify =  (req,res)=>{
    const {token}=req.params;
    jwt.verify(token,'secret',async(err,decoded)=>{
        if(err){
            res.json(err)
        }else{
            let user = await userModel.findOne({email:decoded.email});
            if(user){
               await userModel.findOneAndUpdate({email:decoded.email},{emailConfirm:true});
               res.json({message:"verified"});
            }else{
               res.json({message:"not found"})
            }
        }
    })

    
}


