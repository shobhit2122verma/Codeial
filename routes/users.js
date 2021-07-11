const express=require('express');
const router=express.Router();
const passport=require('passport');
const userscontroller=require('../controllers/users_controller.js');
const postsController=require('../controllers/posts_contoller.js');
router.get('/profile',userscontroller.profile);
router.get('/posts',userscontroller.posts);
router.get('/sign-up',userscontroller.signUp);
router.get('/sign-in',userscontroller.signIn);
router.post('/create',userscontroller.create);
//one main thing is that the post method can take 3 arguments i.e. action,middleware and the function
//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),userscontroller.createSession);
//either we can make the posts controller under the users controller or we can create another another controller for posts and then we can
//require it over here and then make a get request by the router
module.exports=router;