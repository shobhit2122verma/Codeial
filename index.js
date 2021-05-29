const express=require('express');//1
const app=express();//2
const port=8000;//3

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