const express=require('express');//express is created and required only once 5

const router=express.Router();//6

//to check whether it is running or not
console.log('router loaded');
const homecontroller=require('../controllers/home_controller');
router.get('/',homecontroller.home);

module.exports=router;//7