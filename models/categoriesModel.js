const mongoose=require('mongoose');

const categoriesSchema=mongoose.Schema({
category:{
     type:Array,
     default:['Bikes','Cars','Mobiles']
}
});

const category=mongoose.model("category",categoriesSchema)
module.exports=category;