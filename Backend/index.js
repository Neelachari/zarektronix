const express=require("express")
const connection = require("./Config/db")
const signupRouter=require("./Routes/Signup.route")
const cors=require("cors")
const app=express()

app.use(express.json())

app.use(cors())

app.use("/users",signupRouter)



app.get("/", (req,res)=>{
    res.send("Welcome to FluxForm")
})

app.listen(process.env.PORT, async()=>{
    try {
       await connection
       console.log("Server Running on Port", process.env.PORT) 
    } catch (error) {
        console.log(error)
    }
})