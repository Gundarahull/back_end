const express=require('express')
const router=express.Router()
const path=require('path')
const { getsingup, postsignup } = require('../controllers/signup-controller')

router.get('/',getsingup)
router.post('/signup',postsignup)

module.exports=router