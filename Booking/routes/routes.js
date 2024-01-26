const express=require('express')
const productscontroller=require('../controllers/booking')
const path=require('path')
const router=express.Router()

router.get('/',productscontroller.getadddetails)

// router.post('/', productscontroller.postdetails);

router.post('/booking',productscontroller.bookingdetails)

router.get('/admin',productscontroller.getIndex)

router.delete('/deleteBooking/:id', productscontroller.postDeleteBooking);

module.exports=router