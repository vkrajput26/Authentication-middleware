const express=require("express")
const jwt= require("jsonwebtoken")
const app= express();
const {connection}=require("./config/db")
const bcrypt= require("bcrypt")
const {useModel} =require("./models/useModel")

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("homem page")
})





app.post("/signup", async (req, res) => {
    const {email, password} = req.body;
    bcrypt.hash(password, 5, async function(err, hashed_password) {
        if(err){
            res.send("Something went wrong, please signup later")
        }
        const new_user = new useModel({
            email : email,
            password : hashed_password
        })
        await new_user.save()
        res.send("Sign up successfull")
    });
})


app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await useModel.findOne({email})
    const hashed_password = user.password
    bcrypt.compare(password, hashed_password, function(err, result) {
        if(result){
            const token = jwt.sign({email : email}, 'abcd12345')
            res.send({"msg" : "Login successfull", "token" : token})
        }
        else{
            res.send("Login failed")
        }
    });
    
})


app.listen(8012, async()=>{
    try{
        await connection
   console.log("sucessful")
    }
    catch(err){
     console.log("error ")
     console.log(err)
    }
})