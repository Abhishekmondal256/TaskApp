import React from "react";
import {NavLink} from "react-router-dom";
import "../Errorpage/Errorpage.css";
const Errorpage=()=>{
    return (
    <>
    <div id="nf">
    <div className="nf">
    <div className="nf-1">
    
        <h1>404</h1>
    </div>
    <h2>we are sorry,page not found!</h2>
    <p className="mb-5">
        The page you are looking for might have been removed or its temporarily unavailbale
    </p>
    <NavLink to="/">Back to Homepage</NavLink>
    </div>
    </div>
    
    
    
    </>
    )
    
    }
    export default Errorpage;