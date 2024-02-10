const express=require('express')
const { postexpense, getpostexpense, deleteexpense } = require('../controllers/expensive-controller')
const { authenticate } = require('../middleware/middleware')
const { leaderboard } = require('../controllers/leaderboard-controller')
const router=express.Router()



router.get('/addexpense',authenticate,getpostexpense)
router.post('/addexpense',authenticate,postexpense)
router.post('/expense/delete',authenticate,deleteexpense)

router.get('/board',leaderboard)


module.exports=router