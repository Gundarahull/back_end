const express=require('express')
const { getsignuppage, postsignup } = require('../Controllers/signup-controller')
const router=express.Router()

router.get('/',getsignuppage)
router.post('/signup',postsignup)

module.exports=router;