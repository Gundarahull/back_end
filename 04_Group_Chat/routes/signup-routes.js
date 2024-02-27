const express=require('express')
const { getsignuppage, postsignup, get_login_page, postlogin } = require('../Controllers/signup-controller')
const { chat, postchat, getchat } = require('../Controllers/chat-controller')
const { authenticate } = require('../middleware/middleware')
const router=express.Router()

router.get('/',getsignuppage)
router.post('/signup',postsignup)

router.get('/login',get_login_page)
router.post('/postlogin',postlogin)



//chat routes
router.get('/chat',authenticate,chat)
router.post('/chat',authenticate,postchat)

router.get('/chatexpo',authenticate,getchat)

module.exports=router;