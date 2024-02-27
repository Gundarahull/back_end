const { Signup } = require("../models/signup-model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const secretKey ='yourSecretKeyHere'
exports.getsignuppage = (req, res, next) => {
    res.render('Signup')
}

exports.postsignup = (req, res, next) => {
    const username = req.body.username;
    const useremail = req.body.email;
    const password = req.body.password;
    const phonenumber = req.body.phone;
    console.log("done");

    bcrypt.hash(password, 10, (hashErr, hash) => {
        if (hashErr) {
            console.log("Error in hashing:", hashErr);
            return res.status(500).send("Error occurred while hashing password.");
        }

        Signup.findAll({ where: { email: useremail } })
            .then(users => {
                const userEmails = users.map(user => user.email);

                if (userEmails.length > 0) {
                    res.render('mailexist');
                } else {
                    Signup.create({
                        username: username,
                        phonenumber: phonenumber,
                        password: hash,
                        email: useremail,
                    })
                        .then(() => {
                            console.log("User created successfully.");
                            res.redirect('/?success=true');
                        })
                        .catch(createErr => {
                            console.log("Error occurred while creating user:", createErr);
                            return res.status(500).send("Error occurred while creating user.");
                        });
                }
            })
            .catch(findErr => {
                console.log("Error occurred while finding user:", findErr);
                return res.status(500).send("Error occurred while finding user.");
            });
    });
};


//get-login-page
exports.get_login_page= (req, res, next) => {
    res.render('Login')
}

//post-login-page
exports.postlogin = (req, res, next) => {
    const userEmail = req.body.email;
    const password = req.body.password;
    console.log("mail>><><><>",userEmail);
    console.log("into login page");

    Signup.findOne({ where: { email: userEmail } })
        .then(user => {
            if (!user) {
                return res.status(404).send('no email for this user');
            }
            bcrypt.compare(password, user.password)
                .then(result => {
                    if (result) {
                        console.log("Congratulations");

                        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '24h' });

                        res.cookie('token', token, {
                            maxAge: 24 * 60 * 60 * 1000,
                            httpOnly: true
                        });
                        
                        console.log("sucessgull in login");
                        res.redirect('/chat')
                        // const data = Signup.findOne({ where: { ispremium: true, id: user.id } })
                        // if (!data) {
                        //     res.redirect('/expensive');
                        // } else {
                        //     res.render('../views/premium/ur-premium');
                        // }
                    } else {
                        res.status(401).send('Password does not match!')
                    }
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).send("Error occurred while logging in.");
                });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("Error occurred while logging in.");
        });
};
