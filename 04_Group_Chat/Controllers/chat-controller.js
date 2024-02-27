const Chat = require("../models/Chat-model")

exports.chat = (req, res, next) => {
    res.render('Message')
}

exports.postchat= (req, res, next) => {
    const username=req.body.username
    const message=req.body.message
    Chat.create({
        username:username,
        message:message
    }).then(resu=>{
        console.log("CHAT DONE");
    }).catch(err=>{
        console.log("something in chat");
    })
}