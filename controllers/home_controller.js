module.exports.home=function(req,res)//8
{
    // return res.end('<h1>express is up and running<h1>');
    return res.render('home',{
        title: "Home"
    }); 
};
//module.exports.actionName=function(req,res){} 

