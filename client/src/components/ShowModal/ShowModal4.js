import React,{ useState,useEffect } from "react";
import  ReactDOM  from "react-dom";
import "../ShowModal/ShowModal.css";


const MyModal=({closeModal,pup})=>{
  
  
    const [userUpdate,setUserUpdate]=useState({
       name:pup.name, email:pup.email, phone:pup.phone, 
        state:pup.state, city:pup.city, password:"", cpassword:""
    
      });
    
      const validateEmail = (email) => {
    
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      };
      let name,value;
      const handleInputsUpdate=(e)=>{
    
        name=e.target.name;
        value=e.target.value;
        setUserUpdate({...userUpdate,[name]:value});
          }
          
         
const handleUpdate=async(e)=>{
 
  if (!validateEmail(userUpdate.email)) {
    window.alert("Invalid email format");
    return;
  }
    const formData=new FormData();
    
    formData.append("_id",pup._id);
    if(userUpdate.name!==null){
    formData.append("name",userUpdate.name);}
    if(userUpdate.email!==null){
    formData.append("email",userUpdate.email);}
    if(userUpdate.phone!==null){
    formData.append("phone",userUpdate.phone);}
    if(userUpdate.state!==null){
    formData.append("state",userUpdate.state);}
    if(userUpdate.city!==null){
    formData.append("city",userUpdate.city);}
    if(userUpdate.password!==null){
    formData.append("password",userUpdate.password);}
    if(userUpdate.cpassword!==null){
      formData.append("cpassword",userUpdate.cpassword);}
     
  const res=await fetch("updatee",{
   
    method: 'PUT',
    body:formData
  }).then((res)=>{res.json();
    if(res.status===422){window.alert("incomplete form submission");}}
  ).then((data)=>{
    
    console.log(data);}).catch((err)=>{
      
        console.log(err);
        
    });

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
<div className="modal-container">
<form method="PUT" className="register-form" id="register-form updateform">
     <div className="form-group newformgroup"><div id="lab newlab">Name</div>
      <div id="lab2"> <label for="name">
       <i class="zmdi zmdi-account "></i>
        </label>
       <input type="text" name="name" id="name" autoComplete="off" value={userUpdate.name} onChange={handleInputsUpdate} placeholder="enter your name"/>
    
       </div> </div>
     
     <div className="form-group newformgroup"><div id="lab">Email</div>
      <div id="lab2"> <label for="email">
       <i class="zmdi zmdi-email "></i>
        </label>
       <input type="email" name="email" id="email" autoComplete="off" value={userUpdate.email} onChange={handleInputsUpdate}  placeholder="enter your email"/>
    
      </div>  </div>
      
     <div className="form-group newformgroup"><div id="lab">Phone</div>
      <div id="lab2"> <label for="phone">
       <i class="zmdi zmdi-phone-in-talk "></i>
        </label>
       <input type="number" name="phone" id="phone" autoComplete="off" value={userUpdate.phone} onChange={handleInputsUpdate}  placeholder="enter your phone number"/>
    
      </div>  </div>
    
      
   
      

        
    
     <div className="form-group newformgroup"><div id="lab">State</div>
      <div id="lab2"> <label for="state">
       <i class="zmdi zmdi-lock"></i>
        </label>
       <input type="text" name="state" id="state" autoComplete="off" value={userUpdate.state} onChange={handleInputsUpdate} placeholder="enter your state"/>
    
      </div>  </div>
     
     <div className="form-group newformgroup"><div id="lab">City</div>
      <div id="lab2"> <label for="city">
       <i class="zmdi zmdi-gps-dot"></i>
        </label>
       <input type="text" name="city" id="city" autoComplete="off" value={userUpdate.city} onChange={handleInputsUpdate}  placeholder="confirm your city"/>
    
       </div> </div>
      

     <div className="form-group newformgroup"><div id="lab">Password</div>
      <div id="lab2"> <label for="password">
       <i class="zmdi zmdi-gps-dot"></i> 
       </label>
       <input type="password" name="password" id="password" autoComplete="off" value={userUpdate.password} onChange={handleInputsUpdate}  placeholder="enter your password"/>
       </div>
     </div>
     <div className="form-group newformgroup"><div id="lab">Confirm Password</div>
      <div id="lab2"> <label for="cpassword">
       <i class="zmdi zmdi-lock"></i> 
       </label>
       <input type="password" name="cpassword" id="cpassword" autoComplete="off" value={userUpdate.cpassword} onChange={handleInputsUpdate}  placeholder="confirm your password"/>
       </div>
     </div>
    <div className="newformgroupbtn">
     <button type="button" className="model-btn" onClick={()=>{handleUpdate();closeModal();}} >Update</button>
     </div>
    </form>



</div>
</>,document.querySelector(".myPortalModalDiv")

)



}
export default MyModal;