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
            if(user.password===password){
                console.log("Comgrats");
                res.render('../views/login/log-in-success')
                
            }else{
                res.render('../views/login/password') 
            };
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