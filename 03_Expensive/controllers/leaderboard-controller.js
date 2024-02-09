const Expensive = require("../model/expense-model");
const SignUp = require("../model/singup-model");



exports.leaderboard = (req, res) => {
    Expensive.findAll({
        attributes: ['amount'],
        include: [{
            model: SignUp,
            attributes: ['username']
        }],
        order: [
            ['amount', 'DESC']
        ]
    })
    .then(expenses => {
        console.log(">>>>>>>> Length", expenses.length);
        
        //totall adding the MONEY
       
        //using for of loop
        // Calculate total amount for each user
        // for (const item of expenses) {
        //     const { username } = item.signup;
        //     const { amount } = item;
        const totalAmountByUsername = {};
        expenses.forEach(item => {
            const username = item.signup.username;
            const amount = item.amount;
            // If username doesn't exist in the object, initialize it with 0
            if (!totalAmountByUsername[username]) {
                totalAmountByUsername[username] = 0;
            }
            // Add the amount to the total for this user
            totalAmountByUsername[username] += amount;
        });
        const viewdata = {
            expenses,
            totalAmountByUsername, // Pass the total amount by username to the view
            pageTitle: "LEADERBOARD"
        };
    
        res.render('../views/premium/leaderboard', viewdata);
    })
    .catch(error => {
        console.error('Error occurred while fetching data:', error);
        res.status(500).send('Error occurred while fetching data');
    });
}

    // Expensive.findAll({
    //     attributes: ['amount'],
    //     include:[{model:SignUp,
    //         attributes:['username']
    //     }]
    // })
    // .then(expenses => {
    //     console.log(">>>>>>>> LEngth",expenses.length);
    //     for (const item  of expenses) {
    //         console.log(item.amount); 
    //         console.log(item.signup.username);
    //     }
    //     const viewdata={
    //         expenses,
    //         pagetitl:"LEADER BOARD"
    //     }
    //     res.render('../views/premium/leaderboard',viewdata)
        
    // })
    // .catch(error => {
    //     console.error('Error occurred while fetching data:', error);
    //     res.status(500).send('Error occurred while fetching data');
    // });
  