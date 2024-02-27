const express=require('express')
const { getsignuppage, postsignup, get_login_page, postlogin } = require('../Controllers/signup-controller')
const router=express.Router()

router.get('/',getsignuppage)
router.post('/signup',postsignup)

router.get('/login',get_login_page)
router.post('/postlogin',postlogin)

module.exports=router;