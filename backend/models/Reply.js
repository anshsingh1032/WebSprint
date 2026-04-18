const mongoose = require("mongoose")

const replySchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    isAcceptedAnswer:{
        type:Boolean,
        required:true
    },
    fileUrl:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model("Reply",replySchema)































