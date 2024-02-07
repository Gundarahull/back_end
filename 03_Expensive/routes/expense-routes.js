const express=require('express')
const { postexpense, getpostexpense, deleteexpense } = require('../controllers/expensive-controller')
const { authenticate } = require('../middleware/middleware')
const router=express.Router()



router.get('/addexpense',authenticate,getpostexpense)
router.post('/addexpense',postexpense)
router.post('/expense/delete',deleteexpense)



module.exports=router