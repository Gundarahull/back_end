// const SignUp = require("../model/singup-model")
// //for encrpt the password
// const bcrypt = require('bcrypt');

// const jwt = require('jsonwebtoken');

// const secretKey = 'yourSecretKeyHere';

// exports.getsingup = (req, res, next) => {
//     res.render('signup')
// }


// exports.postsignup = (req, res, next) => {

//     const username = req.body.username;
//     const email = req.body.email;
//     const password = req.body.password;

//     const getemail = req.body.email
//     //hashing the password
//     bcrypt.hash(password, 10, (err, hash) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).send("Error occurred while hashing the password");
//         }
//         SignUp.findAll(({ where: { email: getemail } }))
//             .then((users) => {
//                 const userEmails = users.map(user => user.email);
//                 if (userEmails.length > 0) {
//                     res.render('already-exist')
//                 } else {
//                     SignUp.create({
//                         username: username,
//                         email: email,
//                         password: hash // Store the hashed password
//                     })
//                         .then(() => {
//                             console.log("User created successfully.");
//                             res.redirect('/');
//                         })
//                         .catch(err => {
//                             console.log(err);
//                         })
//                 }

//             });
//     })
// }

// exports.getlogin = (req, res, next) => {
//     res.render('log-in')
// }

// exports.getexpensivesubmit = (req, res, next) => {
//     res.render('../views/Expensive/expensive.ejs')
// }

// let token;
// exports.postlogin = (req, res, next) => {
//     const userEmail = req.body.email
//     const password = req.body.password
//     SignUp.findOne({
//         where:
//         {
//             email: userEmail
//         }
//     })
//         .then((user) => {
//             if (user) {
//                 console.log(user.email);
//                 bcrypt.compare(password, user.password, (err, result) => {
//                     if (err) {
//                         console.log(err);
//                     }
//                     if (result) {
//                         console.log("Comgrats");
//                         //this id refers to user
//                         console.log("userID>>>>", user.id);
//                         //encrpt the id with token
//                         token = jwt.sign({
//                             userId: user.id
//                         }, secretKey, {
//                             expiresIn: '24h' // Token expires in 1 hour
//                         });
//                         console.log("token>>>>>", token)
//                         // res.setHeader('Authorization', `Bearer ${token}`);
//                         res.cookie('token', token, {
//                             maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 24 hours
//                             httpOnly: true // Cookie is accessible only by the server
//                         });

//                         // res.redirect('/expensive')

//                         //checking the user is premium or not
//                         SignUp.findOne({where:
//                             {ispremium:true,
//                                 id:user.id
//                             }})
//                         .then((data)=>{
//                             if(data=== null){
//                                 res.redirect('/expensive')    
//                             }
//                             else{
//                                 res.render('../views/premium/ur-premium')
//                             }

//                         }).catch(()=>{
//                             console.log("not inyo the premium");
//                         })
//                     }
//                     else {
//                         res.render('../views/login/password')
//                     };
//                 })
//             } else {

//                 res.render('../views/login/no-email')
//             }
//         }).catch((err) => {
//             console.log(err)
//         });
// }

// exports.getToken = () => {
//     return token;
// };

const SignUp = require("../model/singup-model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKeyHere';

//package for the forget password
const nodemailer = require('nodemailer');
const Forget = require("../model/forgot-model");
//sending mails
const transporter = nodemailer.createTransport({
    // Transport configuration
    service: 'gmail',
    auth: {
        user: "shaikrahul731@gmail.com",
        pass: "znfsrwkvzgtxpgqb"
    }
});

exports.getsingup = (req, res, next) => {
    res.render('signup');
};

exports.postsignup = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);

        const users = await SignUp.findAll({ where: { email: email } });
        const userEmails = users.map(user => user.email);

        if (userEmails.length > 0) {
            return res.render('already-exist');
        } else {
            await SignUp.create({
                username: username,
                email: email,
                password: hash
            });
            console.log("User created successfully.");
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error occurred while creating user.");
    }
};

exports.getlogin = (req, res, next) => {
    res.render('log-in');
};

exports.getexpensivesubmit = (req, res, next) => {
    res.render('../views/Expensive/expensive.ejs');
};

exports.postlogin = async (req, res, next) => {
    const userEmail = req.body.email;
    const password = req.body.password;

    try {
        const user = await SignUp.findOne({ where: { email: userEmail } });

        if (!user) {
            return res.render('../views/login/no-email');
        }

        const result = await bcrypt.compare(password, user.password);
        if (result) {
            console.log("Congratulations");

            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '24h' });

            res.cookie('token', token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            const data = await SignUp.findOne({ where: { ispremium: true, id: user.id } });

            if (!data) {
                res.redirect('/expensive');
            } else {
                res.render('../views/premium/ur-premium');
            }
        } else {
            res.render('../views/login/password');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error occurred while logging in.");
    }
};

exports.getToken = () => {
    return token;
};




//forget password
exports.forgetpassword = (req, res, next) => {
    res.render('../views/login/forgetpassword')
}
const { v4: uuidv4 } = require('uuid');
const { where } = require("sequelize");
const { _logFunc } = require("nodemailer/lib/shared");

const count = []

exports.resetpassword = (req, res, next) => {
    console.log("into the password");
    const userid = req.body.email
    console.log(userid);
    const uuid = uuidv4();

    SignUp.findOne({ where: { email: userid } }).then((user) => {
        if (!user) {
            return res.json({ message: "Email not found" })
        } else {
            console.log("USER ID FOR FORGOT>>>", user.id);

            count.push(user.id)
            console.log("COUNT OF ARRAY------", count);
            const countOfOnes = count.filter(num => num === user.id).length;
            if (countOfOnes > 1) {
                console.log("into the after the count");
                Forget.update(
                    { isactive: true, id: uuid }, // Updated values for isactive and id
                    { where: { userid: user.id } } // Condition for the update
                )
                    .then((result) => {
                        // After the update, you can proceed with sending the email
                        console.log("AFTER UPDATE");
                        const url = uuid
                        const mailOptions = {
                            //manam dhentho aithe authorize ayithamo adhay send chesthundhi
                            from: "shaikrahul731@gmail.com",
                            to: req.body.email,
                            subject: 'MAY BE',
                            text: 'to update the password just clock on the link'
                                + `http://localhost:1864/resetpassword/${url}`,
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log("error");
                            } else {
                                console.log('Email sent: ');
                            }
                        });
                        console.log(result); // Result will contain the number of rows affected
                    })
                    .catch(err => {
                        console.log("Error:", err); // Log any errors that occur during the update
                    });
            } else {
                Forget.create({
                    id: uuid,
                    userid: user.id,
                    isactive: false, // Assuming 'isactive' is a boolean field
                }).then((result) => {
                    const url = uuid
                    console.log(result);
                    const mailOptions = {
                        //manam dhentho aithe authorize ayithamo adhay send chesthundhi
                        from: "shaikrahul731@gmail.com",
                        to: req.body.email,
                        subject: 'UPDATE THE PASSWORD',
                        html: `To update the password, just click on the following link: <a href="http://localhost:1864/resetpassword/?url=${url}">http://localhost:1864/resetpassword/?url=${url}</a>`
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log("error");
                        } else {
                            console.log('Email sent: ');
                        }
                    });
                    // Add email sending logic here
                }).catch(err => {
                    console.log("Error:", err);
                });
            }

        }
    })
    res.redirect('/login')
}




exports.getupdatepassword = (req, res, next) => {
    const params = req.query.url
    console.log(params);
    const viewdata = {
        params
    }
    res.render('../views/login/update', viewdata)
}


exports.postupdatepassword = (req, res, next) => {
    const update = req.body.update
    const params = req.body.params
    console.log(update);
    console.log(params);
    Forget.update({ isactive: true }, { where: { id: params } })
        .then((result) => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        })
    Forget.findOne({ where: { id: params } })
        .then(result => {
            bcrypt.hash(update, 10, (err, hash) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Error occurred while hashing the password");
                }
                SignUp.update({ password:hash },{where:{id:result.userid}})
                .then(()=>{
                    console.log("succesfully updated");
                }).catch(err=>{
                    console.log("FUCKING OUT MAN");
                })
            })
        }).catch(err=>{
            console.log("COME AND SEE IN THE FORGOT FIND ONE");
        })
    res.redirect('/login')
}










//         bcrypt.compare(update.oldPassword, result[0].password).then((response)=> {
//             if(!response) {
//                 req.flash('error','Old Password is incorrect!');
//                 return res.redirect('/forgot-password?url='+params);
//             }else{
//                 bcrypt.genSalt(10,(err,salt)=>{
//                     bcrypt.hash(update.newPassword, salt, (err, hash) => {
//                         User.update({password:hash},{where:{id:result[0].userId}}).then(()=>{
//                             req.flash('success','Your password has been updated successfully! Please login with your
//                             req.flash('success','Password has been updated successfully!');
//                             res.redirect('/login');
//                         })
//                     })
//                 }
//            }).catch((err)=>{
//                console.log(err);
//            })
//        })
//        .catch((err)=>{
//            console.log("Error in updating password");
//            console.log(err);
//        });
// };

