const mongoose = require('mongoose')

const messaggeSchema = mongoose.Schema(
    {
        messagge:String,
        userId:mongoose.SchemaTypes.ObjectId,

    }
)

const messageModel = mongoose.model("message" , messaggeSchema)

module.exports=messageModel