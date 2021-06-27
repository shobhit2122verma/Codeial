const User=require('../models/user');//now we have the user model that we need to get info from the user database

module.exports.profile=function(req,res){
    //now what we will do is that we check if there is already a signed in user there in cookies or not
    //if not then we will be taken back to the sign in page
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(err){
                console.log('user not found');
                return;
            }
            if(user){
                return res.render('user_profile',{
                    title:"User profile",
                    user:user
                });
            }
            else
            {
                return res.redirect('user/sign-in');
            }
        });
    }
    else{
        return res.redirect('/users/sign-in');
    }
    // res.render('user_profile',{title:"codeial"});
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
    //steps to authenticate 
    // find the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("error finding the user");
            return;
        }
        // handle user found

        if(user){
            //handle password which don't match
            if(user.password!=req.body.password){
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }
        else
        {
            //handle user not found
            return Response.redirect('back');
        }
    });
};

module.exports.deleteSession=function(res,req){
    // req.cookies('user_id',);
    if(req.cookies.user_id){
        res.clearCookie.user_id;
        return res.redirect('/users/sign-in');
    }
};