const Post=require('../models/post');
module.exports.home=function(req,res)//8
{
    // return res.end('<h1>express is up and running<h1>');
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: "Home",
    //         posts: posts
    //     })
    // }); 
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title:"Codeial | Home",
            posts:posts
        });
    });
};
//module.exports.actionName=function(req,res){} 

