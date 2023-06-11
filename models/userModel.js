const mongoose=require('mongoose');

//User Schema
const userSchema=mongoose.Schema({
     name:{
          type:String,
          max:255,
          require:true,
     },
     email:{
          type:String,
          max:255,
          min:6,
          require:true,
     },
     phoneNo:{
          type:String,
          max:11,
          min:11,
          require:true,
          
     },
     password:{
          type:String,
          require:true,
          max:255,
          min:5
     },
     edu:{
          type:Boolean,
          require:false,
     },
     date:{
          type:Date,
          default:Date.now
     }

});

//export module

const User=mongoose.model('user',userSchema);
module.exports =User