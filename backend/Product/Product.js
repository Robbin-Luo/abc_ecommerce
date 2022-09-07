const mongoose=require('mongoose');
const {Schema}=require('mongoose');

const ProductSchema=new Schema({
  category:{type:String, required:true, default:'general'},
  product:{
    name:{type:String, required:true},
    slug:{type:String, required:true, unique:true},
    image:{type:String, required:true},
    price:{type:Number, required:true},
    specification:[{specification:{type:String}, priceMod:{type:Number, default:0}}],
    inStock:{type:Number, default:9999},
    brand:{type:String, required:true},
    rating:{type:Number, default:5.0},
    numOfReviews:{type:Number, default:0},
    description:{type:String, default:"description missing"}
  }
})
module.exports=mongoose.model("Product", ProductSchema);