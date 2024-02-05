const SignUp = require("../model/singup-model")

exports.getsingup=(req,res,next)=>{
    res.render('signup')
}

exports.postsignup=(req,res,next)=>{
    const signup={
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    }
    const getemail =req.body.email

    SignUp.findAll(({where :{email:getemail}}))
    .then((users)=>{
        const userEmails = users.map(user => user.email);
        if(userEmails.length>0){
            res.render('already-exist')
        }else{
            SignUp.create(signup).then((sign)=>{
                console.log("inserted");
                res.redirect('/')
            }).catch(err=>{
                console.log(err);
            })
        }
    }).catch(err=>{
        console.log(err);
    })     
}

