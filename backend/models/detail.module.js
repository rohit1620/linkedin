const mongoose=require("mongoose");

const detailSchema=mongoose.Schema({
    "title": String,
"body": String,
"device" : String,
"no_if_comments" : Number
})

const detailModel=mongoose.model("detail",detailSchema);

module.exports={
    detailModel
}