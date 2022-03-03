const mongoose=require('mongoose');

//User Schema
const userSchema=mongoose.Schema({
     name:{
          type:String,
          max:255,
          require:true,
          unique : true
     },
     email:{
          type:String,
          max:255,
          min:6,
          require:true,
          unique : true
          
     },
     phoneNo:{
          type:String,
          max:11,
          min:11,
          require:true,
          unique : true
          
     },
     password:{
          type:String,
          unique : true,
          require:true,
          max:255,
          min:5
     },
     date:{
          type:Date,
          default:Date.now
     }

});

//export module

module.exports=mongoose.model('user',userSchema);