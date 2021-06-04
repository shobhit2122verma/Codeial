const express=require('express');//1
const app=express();//2
const port=8000;//3
const expressLayouts=require('express-ejs-layouts');

//now we have to tell our app to use it so we will do it before routes because in the routes those views are going to be rendered
app.use(expressLayouts);

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