import React,{ useState,useEffect } from "react";
import  ReactDOM  from "react-dom";
import "../ShowModal/ShowModal.css";
import Select from "react-select";
const options=[
    {value:"carpentry" ,label:"carpentry"},
    {value:"labour" ,label:"labour"},
    {value:"painter" ,label:"painter"},
    {value:"dog walker" ,label:"dog walker"},
    {value:"plumber" ,label:"plumber"},
    {value:"tutor" ,label:"tutor"},
    {value:"chef" ,label:"chef"},
    {value:"house cleaner" ,label:"house cleaner"},
    {value:"gardener" ,label:"gardener"},
    ]
const MyModal=({closeModal,pup})=>{
  console.log(pup.skills);
  
    const [userUpdate,setUserUpdate]=useState({
       name:pup.name, email:pup.email, phone:pup.phone, gender:pup.gender, 
       age:pup.age,  state:pup.state, city:pup.city, password:"", cpassword:""
    
      });
      const [selectedOptions,setSelectedOptions]=useState([]);
      useEffect(() => {
        
        setSelectedOptions(pup.skills.map(skill => ({ value: skill, label: skill })));
      }, [pup.skills]);
      const validateEmail = (email) => {
    
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      };
      let name,value;
      const handleInputsUpdate=(e)=>{
        console.log(e);
        name=e.target.name;
        value=e.target.value;
        setUserUpdate({...userUpdate,[name]:value});
          }
          const handleSkills = (selectedOption) => {
            setSelectedOptions(selectedOption);
     
             
           };

          // const handleImageUpdate=(e)=>{
          //   console.log(e.target.files[0]);
          
          
          // setUserUpdate({...userUpdate,profpic:e.target.files[0]});
          
          // }
const handleUpdate=async(e)=>{
  console.log(userUpdate);
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
   
    if(userUpdate.gender!==null){
    formData.append("gender",userUpdate.gender);}
    if(userUpdate.age!==null){
    formData.append("age",userUpdate.age);}
    // if(userUpdate.profpic!==null){
    // formData.append("profpic",userUpdate.profpic,userUpdate.profpic.name);}
    
    if(userUpdate.state!==null){
    formData.append("state",userUpdate.state);}
    if(userUpdate.city!==null){
    formData.append("city",userUpdate.city);}
    selectedOptions.forEach((option) => {
        formData.append("skills[]", option.value); 
      });

    if(userUpdate.password!==null){
    formData.append("password",userUpdate.password);}
    if(userUpdate.cpassword!==null){
      formData.append("cpassword",userUpdate.cpassword);}
    /*formData.append("cpassword",userUpdate.cpassword);*/
  const res=await fetch("update",{
   
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
    
      
   
      

     <div className="form-group newformgroup"><div id="lab">Age</div>
      <div id="lab2"> <label for="age">
       <i class="zmdi zmdi-edit"></i>
        </label>
       <input type="number" name="age" id="age" min="1" autoComplete="off" value={userUpdate.age} onChange={handleInputsUpdate} placeholder="enter your age"/>
    
        </div></div>
        
    
     <div className="form-group newformgroup"><div id="lab">State</div>
      <div id="lab2"> <label for="state">
       <i class="zmdi zmdi-lock"></i>
        </label>
       <input type="text" name="state" id="state" autoComplete="off" value={userUpdate.state} onChange={handleInputsUpdate} placeholder="enter your state"/>
    
      </div>  </div>
      <div className="form-group newformgroup">
        <div id="lab">Gender</div>
        <div id="lab2">
        <i class="zmdi zmdi-male-female"></i>
        <div className="prt">
        <div className="p1">
        <label for="gender">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={userUpdate.gender === "male"}
                  onChange={handleInputsUpdate}
                />
                Male
              </label>
              </div>
              <div className="p1">
              <label for="gender">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={userUpdate.gender === "female"}
                  onChange={handleInputsUpdate}
                />
                Female
              </label>
              </div>
              <div className="p1">
              <label for="gender">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={userUpdate.gender === "other"}
                  onChange={handleInputsUpdate}
                />
                Other
              </label>
              </div>
        </div></div>


       </div>
     <div className="form-group newformgroup"><div id="lab">City</div>
      <div id="lab2"> <label for="city">
       <i class="zmdi zmdi-gps-dot"></i>
        </label>
       <input type="text" name="city" id="city" autoComplete="off" value={userUpdate.city} onChange={handleInputsUpdate}  placeholder="confirm your city"/>
    
       </div> </div>
       <div className="form-group newformgroup"><div id="lab">Skills</div>
      <div id="lab2"> <label for="skills">
       <i class="zmdi zmdi-gps-dot"></i>
        </label>
        <Select options={options} value={selectedOptions} onChange={handleSkills} isMulti={true}/>
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