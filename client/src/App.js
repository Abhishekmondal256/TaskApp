import React,{createContext,useReducer} from "react";
import {Route,Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import AboutUser from "./components/About/AboutUser";
import AboutHelper from "./components/About/AboutHelper";
import Usersignup from "./components/Usersignup/Usersignup";
import Helpersignup from "./components/Helpersignup/Helpersignup";
import Errorpage from "./components/Errorpage/Errorpage";
import Logout from "./components/Logout/Logout";
import PostTask from "./components/PostTask/PostTask";
import FindTask from "./components/FindTask/FindTask";
import UserTask from "./components/UserTask/UserTask";
import HelperTask from "./components/HelperTask/HelperTask";
import Chat from "./components/Chat/Chat";
import HandleApplication from "./components/UserTask/Usertaskapplication";
import { initialState,reducer } from "./reducer/UseReducer";

import HelperChat from "./components/HelperChat/HelperChat";
const UserContext=createContext();
const Routing=()=>{
return(
<Routes>
    <Route path="/" element={<Home/>}/>   
     <Route path="/aboutuser" element={<AboutUser/>}/>
     <Route path="/abouthelper" element={<AboutHelper/>}/>
     <Route path="/helpersignup" element={<Helpersignup/>}/>
     <Route path="/usersignup" element={<Usersignup/>}/>
     <Route path="/logoutuser" element={<Logout/>}/>
     <Route path="/logouthelper" element={<Logout/>}/>
     <Route path="/posttask" element={<PostTask/>}/>
     <Route path="/findtask" element={<FindTask/>}/>
     <Route path="/usertask" element={<UserTask/>}/>
     <Route path="/helpertask" element={<HelperTask/>}/>
     <Route path="/usertask/:id" element={<HandleApplication />} />
     <Route path="/chat" element={<Chat />} />
     <Route path="/helperchat" element={<HelperChat />} />
    
    <Route  path="*" element={<Errorpage/>}/>
     </Routes>
)
}
const App=()=>{
    const [state,dispatch]=useReducer(reducer,initialState);
return (
<>
<UserContext.Provider value={{state,dispatch}}>
<Navbar/>
<Routing/>
    </UserContext.Provider>
</>

)
}
export default App;
export {UserContext};
