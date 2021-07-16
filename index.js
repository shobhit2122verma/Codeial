const express=require('express');//1
const cookieParser=require('cookie-parser');
const app=express();//2
const port=8000;//3
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

//used for session cookie after this we work on our middleware
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongodb-session')(session);
//this is the library that we are using to store the session in the database,unlike other library this requires a argument i.e. the session which we want to store in it


const sassMiddleware=require('node-sass-middleware');
//putting up settings for the sass
//now one thing that has to be noticed here after starting the server that this done not compiled when we are starting the server
//what happens is when we load the page the compilation starts at that time which is slower ,but it does not matter as this is a development server
//when we are working on the production level then we have to send all the files before hand
app.use(sassMiddleware({
    src:'./assets/scss',//this is where we give the source in which we want our scss files to get converted to css
    dest:'./assets/css',//this is where we want to keep our css files
    debug:true,//this is what the info that we see when the server is running so this will show the errors which we want to show 
    outputStyle:'extended',//this tells that we want everything to be in a single or multiple lines write now we are using extended for this
    prefix:'/css'//this is where our server should look out for the css files by default 
}));

//one thing we missed is that we forgot to read through the post request
app.use(express.urlencoded());

app.use(cookieParser());

//now we have to tell our app to use it so we will do it before routes because in the routes those views are going to be rendered
app.use(expressLayouts);
//extract styles and scripts from subpages into the layout
app.set('layout extractStyles',true);//after this we will add the ejs script in the layout ejs so that our styles and link are in right position
app.set('layout extractScripts',true)

app.use(express.static('./assets'));


//setting up the view engine 
app.set('view engine','ejs');
app.set('views','./views');


//mongo store is used to store the session cookie in the db
app.use(session({
    name:'Codeial',
    //TODO change the Secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)   //this is the timelimit of the session till which it is active after this the session is expired
    },
    //store is used to store the session info in the database even if the server restarts
    store:new MongoStore({
            mongooseConnection:db,
            autoRemove:'disabled'
    },function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());//after doing this we go to the users controller

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the serve: ${err}`);
        return;
    }
    console.log(`server is running on port:${port}`);
});//4



//remember the sequence in which we are adding the middleware and other things