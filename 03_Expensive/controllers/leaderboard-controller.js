const Expensive = require("../model/expense-model");
const SignUp = require("../model/singup-model");



exports.leaderboard = (req, res) => {
    SignUp.findAll({
        attributes:['username','totalexpense'],
        order: [       ['totalexpense', 'DESC'] ]
    }).then(expenses=>{
        const viewdata = {
            expenses,
            pageTitle: "LEADERBOARD"
        };
        res.render('../views/premium/leaderboard', viewdata);
    })
    .catch(error => {
        console.error('Error occurred while fetching data:', error);
        res.status(500).send('Error occurred while fetching data');
    });
}



//totall adding the MONEY
       
        //using for of loop
        // Calculate total amount for each user
        // for (const item of expenses) {
        //     const { username } = item.signup;
        //     const { amount } = item;

         // If username doesn't exist in the object, initialize it with 0
     // Add the amount to the total for this user
    
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
  