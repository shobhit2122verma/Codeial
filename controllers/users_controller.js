module.exports.profile=function(req,res){
    res.render('user_profile',{title:"codeial"});
};

module.exports.posts=function(req,res){
    res.end('<h1>Users posts</h1>');
};