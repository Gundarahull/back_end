
const Razorpay = require('razorpay');
const Order = require('../model/order-model');
const SignUp = require('../model/singup-model');

const instance = new Razorpay({
    key_id: 'rzp_test_NqkuUz0R6LWzm5',
    key_secret: 'GCgkEPpR3FDkRGzkNWWKlgSD'
})


exports.createorder = (req, res) => {
    const options = {
        amount: "6900",  // amount in the smallest currency unit
        currency: "INR",
        receipt: "EON'S"
    };
    instance.orders.create(options, (err, order) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        console.log(order);
        res.json(order)

    })
}

exports.isordercomplete = (req, res) => {
    console.log("hi");
    instance.payments.fetch(req.body.razorpay_payment_id)
        .then(endpart => {
            console.log("$$$$$$$$ PAYMENT", endpart);
            if (endpart.status === 'authorized') {
                const premium = {
                    orderid: endpart.order_id,
                    status: endpart.status,
                    paymentid: endpart.id,
                    signupId: req.user.id
                }
                Order.create(premium).then((prem) => {
                    console.log("prem>>>>>>>", prem);
                }).catch(err => {
                    console.log(err);
                })
                const newIsPremiumValue = true; // Set it to true for premium users, or false for non-premium
                console.log(newIsPremiumValue);
                // Perform the update operation
                SignUp.update({ ispremium: newIsPremiumValue }, { where:{id:req.user.id} })
                    .then((result) => {
                        console.log('Update successful:', result);
                        // 'result' will contain information about the number of rows affected
                    })
                    .catch((error) => {
                        console.error('Error updating isPremium:', error);
                    });
                console.log("Order Complete");
                //    res.redirect('/addexpense')
            } else {
                console.log("something WROMG");

            }
        })
}

//storing into databse while failed the trans
exports.failedtrans = (req, res) => {
    console.log("into the fail>>>>>>>>>>>");

    console.log("Request Body:", req.body);
    const fail = {
        paymentid: req.body.paymentId,
        orderid: req.body.orderId,
        status: "FAILED",
        signupId: req.user.id
    }
    console.log(fail);
    console.log("after that");
    Order.create(fail).then((fails) => {
        console.log("gailed>>>>>>>", fails);
    }).catch(err => {
        console.log(err);
    })




    res.sendStatus(200); // Se

}

