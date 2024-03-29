import React,{ useState,useEffect } from "react";
import {useNavigate} from "react-router-dom";
import "../ShowModal/ShowModal2.css";
import  ReactDOM  from "react-dom";
const MyModal2=({closeModal,pup})=>{
    const navigate=useNavigate();
const handleDelete=async(e)=>{
    
    const response = await fetch("/delete", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id:pup.id,role:pup.role })
      }).then(()=>{
       console.log("successfull");
       navigate("/logout",{replace:true});

       }
      ).catch((err)=>
      console.log(err));


}

    useEffect(()=>{
        document.body.style.overflowY="hidden";
        return ()=>{
        document.body.style.overflowY="scroll";
        
        }
        },[]);

    return ReactDOM.createPortal (
        <>
       <div className="modal-wrapper" onClick={closeModal}></div>
       <div className="modal-container delct">
      <form method="DELETE" className="deleteform">

      <div className="del">
      <p>Do you want to delete this account?</p>
       <button type="button" className="model-btn delbtn2" onClick={()=>{handleDelete();closeModal();}}>Delete</button>
       </div>
      </form>
      
       </div>

    </>,document.querySelector(".myPortalModalDiv"));

}
export default MyModal2;