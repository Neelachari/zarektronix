const express=require("express")

const bcrypt=require("bcrypt")

require('dotenv').config()

const RegisterModel=require('../Model/Signup.model')

const signupRouter=express.Router()

signupRouter.post('/register', async(req,res)=>{
    try {
        let {name,email,password}=req.body
        console.log(req.body)
        const existuser=await RegisterModel.find({email})
        if(existuser.length){
            return res.status(400).send({error:"User already exist"})

        }
        if(checkPass(password)){
            const hash=bcrypt.hashSync(password, 8)
            const User=new RegisterModel({...req.body, password:hash})
            await User.save()
            res.status(200).send("The new user has been registered")
        }
    } catch (error) {
        res.status(400).send("something wroung")
    }
    return res.status(400).send({error:"Password should be atleast one uppercase one alpa and one number"})
})

const checkPass=(password)=>{
    if(password.length<8){
        return false
    }
    let alpha="QWERTYUIOPASDFGHJKLZXCVBNM"
    let number="0123456789"
    let char="~!@#$%^&*(){}[]_`=+"
    let result1=false
    let result2=false
    let result3=false

    for(let i=0;i<password.length;i++){
        if(alpha.includes(password[i])){
            result1=true
        }
        if(number.includes(password[i])){
            result2=true
        }
        if(char.includes(password[i])){
            result3=true
        }
    }
    return result1&&result2&&result3 ? true :false
}

module.exports=signupRouter