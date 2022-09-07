const {Schema}=require('mongoose')
const mongoose=require('mongoose')
const CartSchema=new Schema({
  username:{type:String, required:true, unique:true},
  cart:{type:Array, default:[]},
  paid:{type:Boolean, default:false, required:true}
},{
  timestamps:true
})
module.exports=mongoose.model('Cart', CartSchema);