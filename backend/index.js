const express=require("express");
require("dotenv").config();
const {connection} =require("./config/db");
const {userRouter} =require("./routes/user.route")
const {detailRouter}= require("./routes/detail.route");
const {auths} =require("./middlewares/authenticate")

const app=express();
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("home page")
})

app.use('/users',userRouter)
app.use(auths)
app.use('/posts',detailRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to DB");
    } catch (error) {
        console.log("unable to connect",error);
    }
})
