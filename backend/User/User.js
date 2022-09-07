const {Schema}=require('mongoose');
const mongoose=require('mongoose');

const userSchema=new Schema({
  username:{type:String, required:true, unique:true},
  password:{type:String, required:true},
  email:{type:String, required:true, unique:true},
  phone:{type:String, required:true},
  isAdmin:{type:Boolean, default:false},
  shipping:[{type:String}]
})
module.exports=mongoose.model("User", userSchema);