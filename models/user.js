const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{
    timestamps:true
});
//here timestamps is what tells us when the user is created or updated and this is created by mongodb itself

const User=mongoose.model('User',userSchema);
module.exports=User;