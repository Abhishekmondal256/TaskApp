import React,{ useEffect ,useState,useContext,useMemo} from "react";
import "../HelperChat/HelperChat.css";
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink,json,useNavigate } from "react-router-dom";
import {UserContext} from "../../App";
import {IconButton} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {io} from "socket.io-client"; 

const HelperChatArea=()=>{
    const socket=useMemo(()=>io(),[]);
    const[chatId,setChatId]=useState("");
    const [messages, setMessages] = useState([]);
    const {state,dispatch}= useContext(UserContext); 
    const [userName,setUserName]=useState("");
    
    const helperId=JSON.parse(state.user);
   const userId=state.userId;
   
   const [messageContent, setMessageContent] = useState("");
    const navigate = useNavigate();

    const callChatPage=async()=>{
        try {
           
            const requestBody = {
                userId: userId,
                helperId: helperId
            };
            const response = await fetch('/chat2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
      
            const data = await response.json();
            console.log('Response:', data);
            setUserName(data.userName);
            setChatId(data.chatId);
            
            setMessages(data.messages);
            
            // Here you can update state or do other actions with the response data
        } catch (error) {
         navigate("/",{replace:true});
            console.error('Error:', error);
        }
      



    }
   
        function formatTimestamp(timestamp) {
            const date = new Date(timestamp);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        }
    function MessageOthers( {message}){
    
        return (<div className="other-message-container">
           <div className="conversation-container">
        <p className="con-icon">{userName.charAt(0).toUpperCase()}</p>
        <div className="other-text-content">
        <p className="con-title" style={{ textTransform: 'capitalize' }}> {userName}</p>
        <p className="con-lastMessage">{message.content}</p>
        <p className="self-timeStamp">{formatTimestamp(message.createdAt)}</p>
        
        </div>
           </div>
        
        </div>)
    }

    function MessageSelf({ message }){
    
  
        return (<div className="self-message-container">
            <div className="messageBox">
                  <p>{message.content}</p>
                   <p className="self-timeStamp">{formatTimestamp(message.createdAt)}</p>
            </div>
    
    
        </div>)}
        const sendMessage = async () => {
            try {
                const createdAt = new Date();
                // const requestBody = {
                //     userId: userId,
                //     helperId: helperId,
                //     content: messageContent,
                //     chatId:chatId // Add the message content to the request body
                // };
                // const response = await fetch('/send-message2', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify(requestBody)
                // });
                // if (!response.ok) {
                //     throw new Error('Network response was not ok');
                // }
                // const data = await response.json();
                // console.log('Response Message:', data);
                socket.emit("helpermessage", { userId, helperId, content: messageContent, chatId ,createdAt});
                setMessageContent("");
                // Here you can update state or do other actions with the response data
            } catch (error) {
                navigate("/", { replace: true });
                console.error('Error:', error);
            }
        }
        useEffect(()=>{
            callChatPage();
            socket.on("connect",()=>{
                console.log("Connected",socket.id);
                socket.emit("joinRoom", { userId,helperId});
                })
                socket.on("receive-message", (data) => {
                   
                    // Update messages state with the received message
                    setMessages(prevMessages => [...prevMessages, data]);
                });
            return()=>{
                socket.disconnect();
              }
        
            },[])
return (
    <div className="chatArea-Container">
    <div className="chatArea-header">
        <p className="con-icon">{userName.charAt(0).toUpperCase()}</p>
         <div className="header-text">
            <p className="con-title" style={{ textTransform: 'capitalize' }}>{userName}</p>
            {/* <p className="con-timeStamp">timeStamp</p> */}
         </div>
         <IconButton>
            <DeleteIcon/>
         </IconButton>
    </div>
    <div className="messages-container">
    {messages.map((message, index) => (
                        message.helperSender === helperId?
                            <MessageSelf key={index} message={message} /> :
                            <MessageOthers key={index} message={message} />
                    ))}
    </div>
    <div className="text-input-area">
    <input placeholder="Type a Message" className="search-box" value={messageContent} onChange={(e) => setMessageContent(e.target.value)}/>
    <IconButton onClick={sendMessage}>
        <SendIcon />
    </IconButton>
    </div>
    
    </div>
    
    )

}

const HelperChat=()=>{
    return(
    <>
    <div className="ap">
    <div className="main-container">
    <HelperChatArea/>
    </div>
    </div>
    </>
    )
    
    }
    export default HelperChat;
