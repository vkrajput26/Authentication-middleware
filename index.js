const express=require("express")
const jwt= require("jsonwebtoken")
const app= express();
const {connection}=require("./config/db")
const bcrypt= require("bcrypt")
const {useModel} =require("./models/useModel")

app.use(express.json())



const authentication=(req,res,next)=>{
    const token= req.headers?.authorization.split(" ")[1];
    try{
        var decoded= jwt.verify(token,"abcd12345")
        req.body.email=decoded.email
        next()
    }
    catch(err){
        res.send("please login again")
    }
}

const authorisation = (permittedrole) => {
    return async (req, res, next) => 
    {
    const email = req.body.email
    const user = await useModel.findOne({email : email})
    const role = user.role;
 
        if(permittedrole.includes(role)){
            next()
        }
        else{
            res.send("Not authorised")
        }
    }
}






app.post("/signup", async (req, res) => {
    const {email, password,role} = req.body;
    bcrypt.hash(password, 5, async function(err, hashed_password) {
        if(err){
            res.send("Something went wrong, please signup later")
        }
        const new_user = new useModel({
            email : email,
            password : hashed_password,
            role:role
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
app.get("/",authentication,(req,res)=>{
    res.send("homem page")
})


app.post("/products/create", authentication, authorisation(["customer"]), async (req, res) => {
    res.send("Product created")
       
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