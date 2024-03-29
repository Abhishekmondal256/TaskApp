import React,{ useEffect ,useState,useContext,useMemo} from "react";
import "../Chat/Chat.css";
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink,json,useNavigate } from "react-router-dom";
import {UserContext} from "../../App";
import {IconButton} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
// import MessageOthers from "./MessageOthers";
// import MessageSelf from "./MessageSelf";
import {io} from "socket.io-client"; 

const ChatArea=()=>{
  const socket=useMemo(()=>io(),[]);
    const [helperName, setHelperName] = useState("");
    const[chatId,setChatId]=useState("");
    const [messages, setMessages] = useState([]);
   const {state,dispatch}= useContext(UserContext); 
   console.log(state);
   
   const userId=JSON.parse(state.user);
   const helperId=state.helperId;
   const navigate = useNavigate();
   const [messageContent, setMessageContent] = useState("");
const callChatPage=async()=>{
  
   

   try {
   
    
      const requestBody = {
          userId: userId,
          helperId: helperId
      };
      const response = await fetch('/chat', {
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
      setHelperName(data.helperName);
      setChatId(data.chatId);
      
      setMessages(data.messages);
      
      // console.log(messages);
      // Here you can update state or do other actions with the response data
  } catch (error) {
   navigate("/",{replace:true});
      console.error('Error:', error);
  }




}

const sendMessage = async () => {
    try {
        const createdAt = new Date();
        // const requestBody = {
        //     userId: userId,
        //     helperId: helperId,
        //     content: messageContent,
        //     chatId:chatId // Add the message content to the request body
        // };
        // const response = await fetch('/send-message', {
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
        socket.emit("usermessage", { userId, helperId, content: messageContent, chatId ,createdAt});
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
      console.log(data);
      // Update messages state with the received message
      setMessages(prevMessages => [...prevMessages, data]);
      
  });
return()=>{
  socket.disconnect();
}
},[])




function MessageOthers( {message}){
    
return (<div className="other-message-container">
   <div className="conversation-container">
<p className="con-icon">{helperName.charAt(0).toUpperCase()}</p>
<div className="other-text-content">
<p className="con-title" style={{ textTransform: 'capitalize' }}> {helperName}</p>
<p className="con-lastMessage">{message.content}</p>
<p className="self-timeStamp">{formatTimestamp(message.createdAt)}</p>

</div>
   </div>

</div>)

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
function MessageSelf({ message }){
    
  
      return (<div className="self-message-container">
          <div className="messageBox">
                <p>{message.content}</p>
                 <p className="self-timeStamp">{formatTimestamp(message.createdAt)}</p>
          </div>
  
  
      </div>)
  
  }

return (
<div className="chatArea-Container">
<div className="chatArea-header">
    <p className="con-icon">{helperName.charAt(0).toUpperCase()}</p>
     <div className="header-text">
        <p className="con-title" style={{ textTransform: 'capitalize' }}>{helperName}</p>
        {/* <p className="con-timeStamp">timeStamp</p> */}
     </div>
     <IconButton>
        <DeleteIcon/>
     </IconButton>
</div>

<div className="messages-container">
    
{messages.map((message, index) => (
    
    
                    (message.userSender === userId && message.helperReceiver === helperId)?
                        <MessageSelf key={index} message={message} /> :
                        (message.helperSender === helperId && message.userReceiver === userId)?
                        <MessageOthers key={index} message={message}/>:
                        null 
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
const Chat=()=>{
return(
<>
<div className="ap">
<div className="main-container">
<ChatArea/>
</div>
</div>
</>
)

}
export default Chat;