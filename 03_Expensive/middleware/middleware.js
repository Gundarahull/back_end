
const jwt = require('jsonwebtoken');

const SignUp = require('../model/singup-model');

const secretKey = 'yourSecretKeyHere';


exports.authenticate = (req, res, next) => { 
    console.log("hi");
    const token = req.cookies.token;
    console.log('Token value:', token);
    //decrypt the code
    const user=jwt.verify(token,secretKey)
    //getting the token from the cookie
    //nad its id
    console.log("USERID>>>>>",user.userId);
    //particular id>>Expenses
    SignUp.findByPk(user.userId).then((user)=>{ 
        //getting the ID through it
        req.user = user;  //important
        console.log(req.user);
        next();
    }).catch(()=>{res.status(401).send({message: 'You are not authorized to perform this action'})});
}


