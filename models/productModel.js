const mongoose=require('mongoose');

const productSchema =mongoose.Schema({
     userId:{
          type:String,
          require:true,
     },
     productName:{
          type:String,
          max:50,
          require:true
     },
     productTitle:{
          type:String,
          max:50,
          require:true
     },
     productDescription:{
          type:String,
          max:255,
          require:true
     },
     productPrice:{
          type:Number,
          require:true
     },
     productId:{
          type:String,
     },
     approval:{
          type:Boolean,
     }
});

module.exports = mongoose.model("product" , productSchema)