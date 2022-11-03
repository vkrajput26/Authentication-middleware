const jwt= require("jsonwebtoken")
const express=require("express")
const app= express();
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("home page")
})

app.listen(8012, ()=>{
    try{
   console.log("sucessful")
    }
    catch(err){
     console.log("error")
    }
})