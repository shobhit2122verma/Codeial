const mongoose=require("mongoose");

mongoose.connect('mongodb://localhost/codeial_development');
//since we are running it on our own system that is why
//we are calling it as a development environment

const db=mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to mongoose'));


db.once('open',function(){
    console.log('connected to Database :: MongoDB');
});

module.exports=db;