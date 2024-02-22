const { Signup } = require("../models/signup-model");
const bcrypt = require('bcrypt')
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



