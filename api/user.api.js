const { userValidation} = require("../middleware/validation/user.validation");
const { signUp, signIN, emailVerify } = require("../services/user.services");

const app = require('express').Router()

app.post('/signUp',signUp)
app.post('/signIN' , signIN)
app.get('/Verify/:token',emailVerify)

module.exports=app