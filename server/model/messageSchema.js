const mongoose=require("mongoose"),timestamps = require('mongoose-timestamp');
const messageModel=new mongoose.Schema(
{
  userSender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the user sending the message
  userReceiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the user receiving the message
  helperSender: { type: mongoose.Schema.Types.ObjectId, ref: "Helper" }, // Reference to the helper sending the message
  helperReceiver: { type: mongoose.Schema.Types.ObjectId, ref: "Helper" }, // Reference to the helper receiving the message,
  chat:{type:mongoose.Schema.Types.ObjectId,ref:"Chat"},
  content: { type: String, required: true }
},
{timestamps:true}

);


const Message=mongoose.model("Message",messageModel);
module.exports=Message;