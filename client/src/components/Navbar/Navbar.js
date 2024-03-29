import React,{useContext} from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";


import {UserContext} from "../../App";
const Navbar=()=>{
  const {state,dispatch}= useContext(UserContext);
  
  const RenderMenu=()=>{
    if(state.role==="user"){
      
    return(
    <>
 <li class="nav-item">
        <Link class="nav-link" to="/">Home</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/aboutuser">About</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/usertask">Tasks</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/logoutuser">Logout</Link>
      </li>
      </>
      )


    }
    else if(state.role==="helper"){
      return(
        <>
     <li class="nav-item">
            <Link class="nav-link" to="/">Home</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/abouthelper">About</Link>
          </li>
          <li class="nav-item">
        <Link class="nav-link" to="/helpertask">My Tasks</Link>
      </li>
          <li class="nav-item">
            <Link class="nav-link" to="/logouthelper">Logout</Link>
          </li>
          </>
          )

    }
    else{
    return(
    <>
 <li class="nav-item">
        <Link class="nav-link" to="/">Home</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/helpersignup">Helper</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/usersignup">User</Link>
      </li>
      </>


)


}
}
return (
<>
<nav class="navbar navbar-expand-lg navbar-light bg-light  	">
  <Link class="navbar-brand" href="#">Navbar</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ms-auto">
    <RenderMenu/>
    {/* <li class="nav-item">
        <Link class="nav-link" to="/">Home</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/about">About</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/helpersignup">Helper</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/usersignup">User</Link>
      </li> */}
      
     </ul>
  </div>
</nav>
</>

)
}
export default Navbar;