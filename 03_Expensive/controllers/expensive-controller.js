const Expensive = require("../model/expense-model");
const SignUp = require("../model/singup-model");
const sequelize = require("../util/database");
const paginate=require('express-paginate')

//adding into the expenses table
exports.postexpense = async (req, res, next) => {
    let t = null;
    try {
        console.log("into the Expensive");
        t = await sequelize.transaction();
        const expenses = {
            amount: req.body.amount,
            description: req.body.description,
            category: req.body.category,
            signupId: req.user.id
        };
        const exp = await Expensive.create(expenses, { transaction: t });
        console.log("EXPENSES INSERTED SUCCESSFULLY");
        const totalexpense = Number(req.user.totalexpense) + Number(exp.amount);
        await SignUp.update({ totalexpense: totalexpense }, { where: { id: req.user.id }, transaction: t });
        console.log("YEAH DONE");
        await t.commit();
        res.redirect('/addexpense');
    } catch (err) {
        console.log(err);
        if (t !== null) {
            await t.rollback();
        }
    }
};

exports.getpostexpense = async (req, res, next) => {
    try {
        console.log("USERID>>>>>IN GET EXPENSE", req.user.id);

        const expenses = await Expensive.findAll({ where: { signupId: req.user.id } });
        console.log("length>>>>", expenses.length);
        
        // Pagination
        //limit of the expenses in the page 
        const pageLimit = req.query.limit ? parseInt(req.query.limit) : 3;
        // 3
        const currentPage = req.query.page ? parseInt(req.query.page) : 1;
        // 1
        const startIndex = (currentPage - 1) * pageLimit;
        const endIndex = Math.min(startIndex + pageLimit - 1, expenses.length - 1);
        const paginatedExpenses = expenses.slice(startIndex, endIndex + 1);

        const pageCount = Math.ceil(expenses.length / pageLimit);
        const paginationArray = paginate.getArrayPages(req)(pageLimit, expenses.length, currentPage);

        const prevPage = currentPage > 1 ? `${req.baseUrl}?limit=${pageLimit}&page=${currentPage - 1}` : false;
        const nextPage = currentPage < pageCount ? `${req.baseUrl}?limit=${pageLimit}&page=${currentPage + 1}` : false;
        
        console.log("EXPENSES ON FRONT_END", paginatedExpenses);

        console.log("pagelimit",currentPage);
        
        const viewdata = {
            pagetitle: 'Expenses-List',
            expenses: paginatedExpenses,
            pagination: {
                pageLimit,
                currentPage,
                pageCount,
                paginationArray,
                prevPage,
                nextPage,
                baseUrl: req.baseUrl // Pass req.baseUrl explicitly
            }
            
        };
        console.log("PAGINATION ARRAY>>>>>",viewdata.pagination.paginationArray ,"+", "IN ARRAY");

        res.render('../views/Expensive/getexpensive.ejs', viewdata);
    } catch (err) {
        console.log(err);
        // Handle error response here
        res.status(500).send('Internal Server Error');
    }
};


// exports.getpostexpense = async (req, res, next) => {
//     try {
//         console.log("USERID>>>>>IN GET EXPENSE", req.user.id);

//         const expenses = await Expensive.findAll({ where: { signupId: req.user.id } });
//         console.log(expenses.length);
//         console.log("EXPENSES ON FRONT_END");
//         const viewdata = {
//             pagetitle: 'Expenses-List',
//             expenses
//         };

//         res.render('../views/Expensive/getexpensive.ejs', viewdata);
//     } catch (err) {
//         console.log(err);
//     }
// };


//deleting the expenses


// exports.deleteexpense = (req, res, next) => {
//     const expenseId = req.body.expenseid
//     Expensive.destroy({ where: { id: expenseId } })
//         .then(() => {
//             console.log("DELETED");
//             res.redirect('/addexpense')
//         }).catch(err => {
//             console.log(err);
//         })
// }

// exports.deleteexpense = (req, res, next) => {
//     let t; // Declare transaction variable
//     sequelize.transaction().then(transaction => {
//         t = transaction; // Start transaction
//         const expenseId = req.body.expenseid; // Get the expense ID from the request body
//         // Retrieve total data of the expense by ID
//         Expensive.findOne({
//             where: { id: expenseId },
//             attributes: ['amount']
//         }, { transaction: t })
//         .then(totalData => {
//             // Calculate the updated total expense after removing the current expense
//             const removeexpense = Number(req.user.totalexpense) - Number(totalData.amount);
//             // Delete the expense from the database
//             Expensive.destroy({ where: { id: expenseId }, transaction: t })
//             .then(() => {
//                 // Update the total expense of the user
//                 SignUp.update({ totalexpense: removeexpense }, { where: { id: req.user.id }, transaction: t })
//                 .then(() => {
//                     res.redirect('/addexpense'); // Redirect after updating data
//                     t.commit(); // Commit the transaction
//                 })
//                 .catch(error => {
//                     console.log(error); // Handle update error
//                     t.rollback(); // Rollback the transaction
//                 });
//             })
//             .catch(error => {
//                 console.log(error); // Handle delete error
//                 t.rollback(); // Rollback the transaction
//             });
//         })
//         .catch(error => {
//             console.log(error); // Handle find error
//             t.rollback(); // Rollback the transaction
//         });
//     })
//     .catch(error => {
//         console.log(error); // Handle transaction error
//         next(error); // Pass the error to the error handling middleware
//     });
// };

exports.deleteexpense = async (req, res, next) => {
    let t; // Declare transaction variable
    try {
        t = await sequelize.transaction(); 
        const expenseId = req.body.expenseid;
       
        const totalData = await Expensive.findOne({
            where: { id: expenseId },
            attributes: ['amount'],
            transaction: t
        });

        const removeexpense = Number(req.user.totalexpense) - Number(totalData.amount);

        
        await Expensive.destroy({ where: { id: expenseId }, transaction: t });

        
        await SignUp.update({ totalexpense: removeexpense }, { where: { id: req.user.id }, transaction: t });

        
        await t.commit();
        res.redirect(req.get('referer'));
    } catch (error) {
        console.log(error); 
        await t.rollback(); 
        next(error); 
    }
};

