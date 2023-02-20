const express=require("express");
const {userModel}= require("../models/user.module")
const jwt=require("jsonwebtoken");
const bcrypt= require("bcrypt")

const userRouter=express.Router();

userRouter.post('/register', async(req,res)=>{
    try {
        const {name, email ,gender ,password ,age ,city}=req.body;
       
        
    
            bcrypt.hash(password, 5, async(err, hash)=> {
                // Store hash in your password DB.
                if(err){
                    res.send({"msg":"wrong credintial"},err.message)
                }else{
                 const user=new userModel({name, email ,gender  ,age ,city,password:hash});
                    await user.save();
                     res.send({"msg":"user has been registered"})
                }
            });
            
        
       
    } catch (error) {
        res.send({"msg":"user has not been registered"},error.message)
    }
   
})

userRouter.post('/login', async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user= await userModel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password, function(err, result) {
                // result == true
                if(result){
                    let token=jwt.sign({course:"backend"},"masai")
                    res.send({"msg":"logined in","token":token})
                }else{
                    res.send({"msg":"Wrong credintial",err})
                }
            });
            
        }else{
            res.send({"msg":"Wrong credintial"})
        }
    } catch (error) {
        res.send({"msg":"sonthing went wrong"}.error.message)
    }
    
})

module.exports={
    userRouter
}