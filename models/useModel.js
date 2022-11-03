const mongoose = require("mongoose")

const UseSchema= new mongoose.Schema({
    email:String,
    password:String,
    role:String,
})

const  useModel=mongoose.model("authuser",UseSchema)
module.exports={
    useModel
}