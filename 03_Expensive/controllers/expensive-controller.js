const Expensive = require("../model/expense-model");
const SignUp = require("../model/singup-model");
const sequelize = require("../util/database");

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

        console.log("EXPENSES ON FRONT_END");
        const viewdata = {
            pagetitle: 'Expenses-List',
            expenses
        };

        res.render('../views/Expensive/getexpensive.ejs', viewdata);
    } catch (err) {
        console.log(err);
    }
};


//deleting the expenses

exports.deleteexpense = async (req, res, next) => {
    let t;
    try {
        t = await sequelize.transaction();
        const expenseId = req.body.expenseid;
        await Expensive.destroy({ where: { id: expenseId }, transaction: t });
        await t.commit();
        console.log("DELETED");
        res.redirect('/addexpense');
    } catch (err) {
        console.log(err);
        if (t) {
            await t.rollback();
        }
    }
};








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