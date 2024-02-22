const { Signup } = require("../models/signup-model");
const bcrypt=require('bcrypt')
exports.getsignuppage=(req,res,next)=>{
    res.render('Signup')
}


exports.postsignup=(req,res,next)=>{
    const username = req.body.username;
    const useremail = req.body.email;  
    const password = req.body.password;
    const phonenumber=req.body.phonenumber
    console.log("done");
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.log("Error in hashing");
        }
        Signup.create({
            username: username,
            phonenumber:phonenumber,
            password: hash,
            email: useremail, 
        }).then((result) => {
            console.log("USER CREATED SUCCESSFULLY");
            res.redirect('/')
        }).catch(err => {
            console.log(err);
        });
    });

}