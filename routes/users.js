const express=require('express');
const router=express.Router();

const userscontroller=require('../controllers/users_controller.js');
const postsController=require('../controllers/posts_contoller.js');
router.get('/profile',userscontroller.profile);
router.get('/posts',userscontroller.posts);
router.get('/sign-up',userscontroller.signUp);
router.get('/sign-in',userscontroller.signIn);
//either we can make the posts controller under the users controller or we can create another another controller for posts and then we can
//require it over here and then make a get request by the router
module.exports=router;