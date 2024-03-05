const mongoose =require('mongoose')

const signupSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
})

const SignupModel=mongoose.model('FluxForm_signup', signupSchema)

module.exports=SignupModel