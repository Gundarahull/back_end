const express=require('express')
const { getsignuppage } = require('../Controllers/signup-controller')
const router=express.Router()

router.get('/',getsignuppage)

module.exports=router;