import React,{ useState,useEffect } from "react";
import "../ShowModal/ShowModal3.css";
import  ReactDOM  from "react-dom";
const MyModal3=({closeModal,pup})=>{
    
    const [userUpdate,setUserUpdate]=useState({
       profpic:""
     
       });
       
const handleImageUpdate=(e)=>{
            console.log(e.target.files[0]);
          
          
          setUserUpdate({...userUpdate,profpic:e.target.files[0]});
          
          }
         
          const handleimg=async(e)=>{
        
            const formData=new FormData();
             
            formData.append("_id",pup.id);
            formData.append("role",pup.role);
            if(userUpdate.profpic!==""){
            formData.append("profpic",userUpdate.profpic,userUpdate.profpic.name);
            const res=await fetch("/update2",{
              method: 'PUT',
              body:formData
            }).then((res)=>{res.json();
               
            }).then((data)=>{
              console.log(data);}).catch((err)=>{
                  console.log(err);
              });
          }
            else {
              window.alert("incomplete form submission");
            }
           
          
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
       <div className="modal-container imct">
      <form method="PUT" className="imform">

      <div className="imfordiv">
       <div className="form-group newformgroup newformgroupyi"><div id="lab">Profile Pic</div>
      <div id="lab2"> <label htmlFor="profpic">
       <i class="zmdi zmdi-image"></i>
        </label>
       <input type="file" name="profpic" id="profpic"  autoComplete="off" onChange={handleImageUpdate}  placeholder="profile pic"/>
     
        </div></div>
        
       <button type="button" className="model-btn imforbut" onClick={()=>{handleimg();closeModal();}}>Update</button>
       </div>
      </form>
      
       </div>

    </>,document.querySelector(".myPortalModalDiv"));




}
export default MyModal3;