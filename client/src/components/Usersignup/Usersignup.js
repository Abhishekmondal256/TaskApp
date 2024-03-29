import React, { useState ,useContext} from 'react';
import {useNavigate} from "react-router-dom";
import "./Usersignup.css";
import {UserContext} from "../../App";
const Usersignup = () => {
  const {state,dispatch}= useContext(UserContext);
  const navigate=useNavigate();
  const [user,setUser]=useState({
    name:"",email:"", phone:"", state:"", city:"",profpic:"",  password:"", cpassword:"",role: "user"

  });
  const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
  const validateEmail = (email) => {
    
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const [activeForm, setActiveForm] = useState('login');
  let name,value;
  const handleInputs=(e)=>{

name=e.target.name;
value=e.target.value;

  setUser({ ...user, [name]: value });

  }
  const handleImage=(e)=>{
    console.log(e.target.files[0]);
  
  
  setUser({...user,profpic:e.target.files[0]});
  
  }
  const handleSwitch = (form) => {
    setActiveForm(form);
  };
  const loginUser=async(e)=>{
    e.preventDefault();
    const res=await fetch("/usersignin",{
    method:"POST",
    credentials:"include",
    headers:{
    "Content-Type":"application/json"
    
    },
    body:JSON.stringify({
     email,password 
    })
    
    
    });
    
    const data=await res.json();
    
    if(res.status===400 || !data ){
      window.alert("Invalid credentials");
    }else{
    
      window.alert("Login successfull");
      
      navigate("/",{replace:true});
      
      dispatch({type:"USER",payload: { user: data.id, role: "user" , email: data.email,
      phone: data.phone,
      name: data.name}});
    }
    
    }
  const PostData=async(e)=>{
    e.preventDefault();
    
    if (!validateEmail(user.email)) {
      window.alert("Invalid email format");
      return;
    }
    const formData=new FormData();
    formData.append("name",user.name.toLowerCase());
    formData.append("email",user.email);
    formData.append("phone",user.phone);
    
    
   
    formData.append("state",user.state.toLowerCase());
    formData.append("city",user.city.toLowerCase());
    formData.append("profpic",user.profpic,user.profpic.name);
   
    formData.append("password",user.password);
    formData.append("cpassword",user.cpassword);
    formData.append("role", user.role);
    const res=await fetch("/userregister",{
      method:"POST",
      body:formData
      
         }).then((res)=>{res.json(); if(res.status===422){
          window.alert("incomplete or wrong submission");
          
        }}).then((data)=>{
               
          window.alert("Registration sucessfull");
          
          navigate("/login",{replace:true});}).
          catch((err)=>{
            window.alert("registration failed");
            console.log(err);
         });
  }
  return (
    <section className="forms-section">
      <h1 className="section-title">User</h1>
      <div className="forms">
        <div className={`form-wrapper ${activeForm === 'login' ? 'is-active' : ''}`} > 
          <button type="button" className="switcher switcher-login" onClick={() => handleSwitch('login')}>
            Login
            <span className="underline"></span>
          </button>
          <form method="POST" className="form form-login">
            <fieldset>
              <legend>Please, enter your email and password for login.</legend>
              <div className="input-block">
                <label htmlFor="login-email">E-mail</label>
                <input id="login-email" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
              </div>
            </fieldset>
            <button type="submit" className="btn-login"  onClick={loginUser}>Login</button>
          </form>
        </div>
        <div className={`form-wrapper ${activeForm === 'signup' ? 'is-active' : ''}`} style={{ marginLeft: '80px' }}>
          <button type="button" className="switcher switcher-signup" onClick={() => handleSwitch('signup')}>
            Sign Up
            <span className="underline"></span>
          </button>
          <form method="POST"  className="form form-signup">
            <fieldset>
              <legend>Please, enter your email, password and password confirmation for sign up.</legend>
              
              <div className="row">
              <div className="col-md-6">
              <div className="input-block">
                <label htmlFor="signup-name">Name</label>
                <input id="signup-name" type="text"  name="name" value={user.name} onChange={handleInputs} required />
              </div>
              <div className="input-block">
                <label htmlFor="signup-email">E-mail</label>
                <input id="signup-email" type="email" name="email" value={user.email} onChange={handleInputs}  required />
              </div>
              <div className="input-block">
                <label htmlFor="signup-phone">Phone No.</label>
                <input id="signup-phone" type="number" name="phone" value={user.phone} onChange={handleInputs}  required />
              </div>
              <div className="input-block">
                <label htmlFor="signup-state">State</label>
                <input id="signup-state" type="text" name="state"value={user.state} onChange={handleInputs} required />
              </div>
              </div>
              <div className="col-md-6">
              <div className="input-block">
                <label htmlFor="signup-city">city</label>
                <input id="signup-city" type="city" name="city" value={user.city} onChange={handleInputs} required />
              </div>
              <div className="input-block">
                <label htmlFor="signup-profpic">Profile Pic</label>
                <input type="file"id="signup-profpic" name="profpic" onChange={handleImage}  required   />

              </div>
              <div className="input-block">
                <label htmlFor="signup-password-confirm">password</label>
                <input id="signup-password-confirm" name="password" type="password" value={user.password} onChange={handleInputs} required />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password-cconfirm">Confirm password</label>
                <input id="signup-password-cconfirm" name="cpassword" type="password"  value={user.cpassword} onChange={handleInputs} required />
              </div>
              </div>
              </div>
            </fieldset>
            <button type="submit" className="btn-signup"  onClick={PostData} >Register</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Usersignup;