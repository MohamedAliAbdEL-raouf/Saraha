const mongoose = require('mongoose')
module.exports.dbConnection = ()=>{
    mongoose.connect('mongodb+srv://route:route123@cluster0.cx07ylx.mongodb.net/saraha')
}