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
const Sib=require('sib-api-v3-sdk')
const client=Sib.ApiClient.instance
const apiKey=client.authentications['api-key']
apiKey.apiKey="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"
const tranEmailApi = new Sib.TransactionalEmailsApi();

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
exports.forgetpassword=(req, res, next) =>{
    res.render('../views/login/forgetpassword')
}


exports.resetpassword = (req, res, next) => {
    console.log(req.body.email);
    const sender = {
        email: 'shaikrahul1105@gmail.com',
        name: 'RAHUL'
    };

    const receiver = {
        email: req.body.email
    };

    // Create the email request
    const sendTransacEmail = new Sib.SendSmtpEmail();
    sendTransacEmail.sender = sender;
    sendTransacEmail.to = [receiver];
    sendTransacEmail.subject = 'Password Reset Link';
    sendTransacEmail.textContent = 'PASSWORD MARCHIPOYEDHI YENDHI RA PUMKA';

    // Send the transactional email
    tranEmailApi.sendTransacEmail(sendTransacEmail)
        .then((response) => {
            console.log("Email sent successfully:", response);
            res.status(200).json({ message: "Email sent successfully" });
        })
        .catch((error) => {
            console.error("Error sending email:");

        });
};