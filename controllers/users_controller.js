const User=require('../models/user');//now we have the user model that we need to get info from the user database

module.exports.profile=function(req,res){
    res.render('user_profile',{title:"codeial"});
};

module.exports.posts=function(req,res){
    res.end('<h1>Users posts</h1>');
};

//render the signIn page
module.exports.signIn=function(req,res){
    res.render('user_sign_in',{title:"Codeial | Sign In"});
};


//render the signUp page
module.exports.signUp=function(req,res){
    res.render('user_sign_up',{title:"Codeial | Sign Up"});
};

//get the sign up data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("error finding the user");
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log("error in signing up user");
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else
        {
            return res.redirect('back');
        }
    });//this first finds if the user is present or not
};

module.exports.createSession=function(req,res){
    //TO DO
};