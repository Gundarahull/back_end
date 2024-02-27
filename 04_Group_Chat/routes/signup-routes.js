const express=require('express')
const { getsignuppage, postsignup, get_login_page, postlogin } = require('../Controllers/signup-controller')
const { chat, postchat } = require('../Controllers/chat-controller')
const router=express.Router()

router.get('/',getsignuppage)
router.post('/signup',postsignup)

router.get('/login',get_login_page)
router.post('/postlogin',postlogin)

router.get('/chat',chat)
router.post('/chat',postchat)

module.exports=router;