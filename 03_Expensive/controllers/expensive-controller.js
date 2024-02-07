const Expensive = require("../model/expense-model")

//adding into the expenses table
exports.postexpense=(req,res,next)=>{
    const expenses={
        amount:req.body.amount,
        description:req.body.description,
        category:req.body.category
    }
    Expensive.create(expenses).then((exp)=>{
        console.log("EXPENSES INSERTED SUCCESSFULLY");
        res.redirect('/addexpense')
    }).catch(err=>{
        console.log(err);
    })
}

//retriving the info to the page
exports.getpostexpense=(req,res,next)=>{
    console.log("USERID>>>>>IN GET EXPENSE",req.user.id);
    //req.user just returning the row data of logged one
    Expensive.findAll({where: { signupId : req.user.id}}).then((expenses)=>{
        console.log("EXPENSES ON FRONT_END");
        const viewdata={
            pagetitle:'Expenses-List',
            expenses
        }
        res.render('../views/Expensive/getexpensive.ejs',viewdata)
    }).catch(err=>{
        console.log(err);
    })
}

//deleting the expenses
exports.deleteexpense=(req,res,next)=>{
    const expenseId=req.body.expenseid
    Expensive.destroy({where:{id:expenseId}})
    .then(()=>{
        console.log("DELETED");
        res.redirect('/addexpense')
    }).catch(err=>{
        console.log(err);
    })
}