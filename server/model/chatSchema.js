const mongoose=require("mongoose"),timestamps = require('mongoose-timestamp');
const chatModel=new mongoose.Schema(
    {
    chatName:{type:String},
    user: { // Reference to the user participating in the chat
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // Reference to User model
    },
    helper: { // Reference to the helper participating in the chat
        type: mongoose.Schema.Types.ObjectId,
        ref: "Helper" // Reference to Helper model
    },
     
    },
    {timestamps:true}
    
)

const Chat=mongoose.model("Chat",chatModel);
module.exports=Chat;