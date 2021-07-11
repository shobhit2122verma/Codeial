const passport=require('passport');
//now we have to use the passport local and specificaly Strategy in passport local is what we will be needing
//remember the naming convention that is used in this as passort suggest us to do that for no confusion
const LocalStrategy=require('passport-local').Strategy;
//now we need to tell the passport to use this LocalStrategy
const User=require('../models/user');
// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email,password,done){
        //find the user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('error in finding user --> Passport');
                return done(err);
            }
            if(!user||user.password!=password){
                console.log('Invalid username/password');
                return done(null,false);
            }
            return done(null,user);
        });
    }
));


//serializing the user to decide which key is kept in the cookies
//this basically means pushing which data of the user we want to store in the cookie now this is just like res.cookie('user_id','user.id');
passport.serializeUser(function(user,done){
    done(null,user.id);
});


//now deserialing will work when browser send the request the browser sents back the user id
//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user --> Passport');
            return done(err);
        }
        return done(null,user);
    })
});

//check if the user is authenticated
//we are creating this function under passport and we will use it as a middleware
passport.checkAuthentication=function(req,res,next){
    //if the user is signed in, then pass on the request to the next function which is my controllers action
    if(req.isAuthenticated()){
        return next;
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending it to the locals views
        res.locals.user=req.user;//now whenever the user is signed in then the information of the user is saved in the req.user because we have used the model and req.user is already handled by the passport
        
    }
}

module.exports=passport;