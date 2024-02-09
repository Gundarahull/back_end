const SignUp = require("../model/singup-model")
//for encrpt the password
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const secretKey = 'yourSecretKeyHere';

exports.getsingup = (req, res, next) => {
    res.render('signup')
}


exports.postsignup = (req, res, next) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const getemail = req.body.email
    //hashing the password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error occurred while hashing the password");
        }
        SignUp.findAll(({ where: { email: getemail } }))
            .then((users) => {
                const userEmails = users.map(user => user.email);
                if (userEmails.length > 0) {
                    res.render('already-exist')
                } else {
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

exports.getlogin = (req, res, next) => {
    res.render('log-in')
}

exports.getexpensivesubmit = (req, res, next) => {
    res.render('../views/Expensive/expensive.ejs')
}

let token;
exports.postlogin = (req, res, next) => {
    const userEmail = req.body.email
    const password = req.body.password
    SignUp.findOne({
        where:
        {
            email: userEmail
        }
    })
        .then((user) => {
            if (user) {
                console.log(user.email);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if (result) {
                        console.log("Comgrats");
                        //this id refers to user
                        console.log("userID>>>>", user.id);
                        //encrpt the id with token
                        token = jwt.sign({
                            userId: user.id
                        }, secretKey, {
                            expiresIn: '24h' // Token expires in 1 hour
                        });
                        console.log("token>>>>>", token)
                        // res.setHeader('Authorization', `Bearer ${token}`);
                        res.cookie('token', token, {
                            maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 24 hours
                            httpOnly: true // Cookie is accessible only by the server
                        });

                        // res.redirect('/expensive')

                        //checking the user is premium or not
                        SignUp.findOne({where:
                            {ispremium:true,
                                id:user.id
                            }})
                        .then((data)=>{
                            if(data=== null){
                                res.redirect('/expensive')    
                            }
                            else{
                                res.render('../views/premium/ur-premium')
                            }
                            
                        }).catch(()=>{
                            console.log("not inyo the premium");
                        })
                    }
                    else {
                        res.render('../views/login/password')
                    };
                })
            } else {
                
                res.render('../views/login/no-email')
            }
        }).catch((err) => {
            console.log(err)
        });
}

exports.getToken = () => {
    return token;
};




