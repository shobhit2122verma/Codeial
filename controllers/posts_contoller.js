// module.exports.posts=function(req,res){
//     res.end('<h1>Users posts</h1>');
// }
const Post=require('../models/post');
module.exports.create=function(req,res){
    Post.create({
        content:req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){
            console.log("error creating a post");
            return;
        }
        return res.redirect('back');
    });
}