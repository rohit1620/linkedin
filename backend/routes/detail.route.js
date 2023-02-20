const express=require("express");
const {detailModel}=require("../models/detail.module")

const detailRouter=express.Router();
detailRouter.get("/",async(req,res)=>{
    let query=req.query.device
    console.log(query);
    if(query){
        const data= await detailModel.find({"device":query})
        res.send(data)
    }else{
        const data= await detailModel.find()
        res.send(data)
    }
    
})

detailRouter.post("/create",async(req,res)=>{
    try {
        const payload=req.body;
    const data=new detailModel(payload);
    await data.save()
    res.send("detail created")
    } catch (error) {
        res.send({"msg":"Wrong credintial",error})
    }
    
})

detailRouter.delete('/delete/:id',async(req,res)=>{
    let id=req.params.id
    try {
        await detailModel.findByIdAndDelete({_id:id})
        res.send(`deleted detail ${id}`)
        
    } catch (error) {
        res.send({"msg":"Wrong credintial",error})
    }
})

detailRouter.patch('/update/:id',async(req,res)=>{
    let id=req.params.id
    try {
        await detailModel.findByIdAndUpdate({_id:id},req.body)
        res.send(`update detail ${id}`)
        
    } catch (error) {
        res.send({"msg":"Wrong credintial",error})
    }
})

module.exports={
    detailRouter
}