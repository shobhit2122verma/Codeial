const express=require('express');//1
const cookieParser=require('cookie-parser');
const app=express();//2
const port=8000;//3
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const { urlencoded } = require('express');

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
//use express router
app.use('/',require('./routes'))


app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the serve: ${err}`);
        return;
    }
    console.log(`server is running on port:${port}`);
});//4