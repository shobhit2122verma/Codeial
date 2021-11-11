const mongoose=require('mongoose');


const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    //include the array of ids of all comments in this post schema itself so that all the comments of this particualr post are here
    comments:[{
        type:mongoose.Types._ObjectId,
        ref:"comment"
    }]
},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);
module.exports = Post;