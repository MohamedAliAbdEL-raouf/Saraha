const { auth } = require('../middleware/authentication/auth')
const { addMsg, getMsg } = require('../services/message.service')

const app = require('express').Router()

app.post('/addMsg' , addMsg)
app.get('/getMsg' , auth , getMsg)

module.exports=app