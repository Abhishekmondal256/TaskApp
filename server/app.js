const dotenv=require("dotenv");
const express=require("express");
const mongoose=require("mongoose");
const socketIo = require("socket.io");
const app=express();
dotenv.config({path:"./config.env"});
require("./db/conn");
const User=require("./model/userSchema");
const Chat=require("./model/chatSchema");
const Task =require("./model/taskSchema");
const Message=require("./model/messageSchema");
const Helper=require("./model/helperSchema");
app.use(express.json());

app.use(require("./router/auth"));

app.use('/public',express.static('public'));
const PORT=process.env.PORT;


const middleware=(req,res,next)=>{
console.log("middleware");

}
middleware();
app.get("/",(req,res)=>{
res.send("Hello World");
})

const server=app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})

 const io = socketIo(server);
 io.on("connection",(socket)=>{
    console.log("User Connected",socket.id);
    socket.on("joinRoom", async ({ userId,helperId }) => {
        try {
            // Create a unique room identifier based on userId and helperId
            const room = `${userId}-${helperId}`;

            // Join the room
            socket.join(room);

            console.log(`User ${userId} and Helper ${helperId} joined room ${room}`);
        } catch (error) {
            console.error('Error:', error);
        }
    });
   
    socket.on("usermessage", async ({ userId, helperId, content, chatId ,createdAt}) => {
        try {
            // Emit the message to the room
            let userSender=userId, helperReceiver=helperId;
            // console.log("user message recieved");
            const room = `${userId}-${helperId}`;
            io.to(room).emit("receive-message", { userSender, helperReceiver, content, chatId,createdAt});
            // console.log("user message recieved here");
            // Save the message to the database
            const newMessage = new Message({
                userSender,
                helperReceiver,
                content,
                chat:chatId,
                
            });
            await newMessage.save();

            console.log(`Message sent by User ${userId} to Helper ${helperId} in room ${chatId}`);
        } catch (error) {
            console.error('Error:', error);
        }
    });
    socket.on("helpermessage", async ({ userId, helperId, content, chatId ,createdAt}) => {
        try {
            // Emit the message to the room
            let userReceiver=userId, helperSender=helperId;
            const room = `${userId}-${helperId}`;
            io.to(room).emit("receive-message", { userReceiver, helperSender, content, chatId ,createdAt});

            // Save the message to the database
            const newMessage = new Message({
                userReceiver,
                helperSender,
                content,
                chat:chatId,
                
            });
            await newMessage.save();

            console.log(`Message sent to User ${userId} by Helper ${helperId} in room ${chatId}`);
        } catch (error) {
            console.error('Error:', error);
        }
    });
    socket.on("disconnect",()=>{
console.log("User disconnected",socket.id);

    })
 })


