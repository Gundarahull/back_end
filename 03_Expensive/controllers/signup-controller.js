const SignUp = require("../model/singup-model")
//for encrpt the password
const bcrypt = require('bcrypt');

exports.getsingup=(req,res,next)=>{
    res.render('signup')
}


exports.postsignup=(req,res,next)=>{

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const getemail =req.body.email
    //hashing the password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error occurred while hashing the password");
        }
        SignUp.findAll(({where :{email:getemail}}))
        .then((users)=>{
            const userEmails = users.map(user => user.email);
            if(userEmails.length>0){
                res.render('already-exist')
            }else{
                SignUp.create({
                    username: username,
                    email: email,
                    password: hash // Store the hashed password
                })
                .then(() => {
                    console.log("User created successfully.");
                    res.redirect('/');
                })
                .catch(err => {
                    console.log(err);
                })
                }
            
        });
})
}

exports.getlogin=(req,res,next)=>{
    res.render('log-in')
}

exports.postlogin=(req,res,next)=>{
    const userEmail=req.body.email
    const password=req.body.password
    SignUp.findOne({where:{email:userEmail}})
    .then((user)=>{
        if(user){
            console.log(user.email);
            bcrypt.compare(password, user.password,(err,result)=>{
                if(err){
                    console.log(err);
                }
                if(result){
                    console.log("Comgrats");
                res.render('../views/login/log-in-success')
                }
                else{
                res.render('../views/login/password') 
            };
            })   
        }else{
            res.render('../views/login/no-email')  
        }
    }).catch((err)=>{
        console.log(err)
    });
}






















// if(!user || !user.validPassword(password)){
        //     req.flash('error','Invalid Email or Password')
        //     return res.redirect('/login') 
        // }
        // req.session.userId=user.id;
        // req.session.isLoggedIn=true;
        // req.session.name=user.name;
        // //console.log(req.session)
        // res.locals.currentUser=req.session.name
        // res.redirect("/")