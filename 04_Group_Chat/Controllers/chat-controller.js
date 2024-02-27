const Chat = require("../models/Chat-model")

exports.chat = (req, res, next) => {
    res.render('Getchat')
}

exports.postchat= (req, res, next) => {
    const username=req.body.username
    const message=req.body.message
    Chat.create({
        username:username,
        message:message,
        signupId: req.user.id 
    }).then(resu=>{
        console.log("CHAT DONE");
        res.redirect('/chatexpo')
    }).catch(err=>{
        console.log("something in chat");
    })
}

exports.getchat= (req, res, next) => {
    Chat.findAll({where:{signupId: req.user.id }})
    .then(chats=>{
        console.log(chats);
        const viewdata={
            chats
        }
        res.render('Getchat',viewdata)
    }).catch(err=>{
        console.log("error while fetching the chat from database");
    })
}