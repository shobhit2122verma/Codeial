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