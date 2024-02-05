const express=require('express')
const router=express.Router()
const path=require('path')
const { getsingup, postsignup, getlogin, postlogin } = require('../controllers/signup-controller')

router.get('/',getsingup)
router.post('/signup',postsignup)
//login
router.get('/login',getlogin)
router.post('/login',postlogin)

module.exports=router