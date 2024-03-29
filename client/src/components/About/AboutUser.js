import React, { useEffect ,useState}  from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { RiImageEditFill } from "react-icons/ri";
import MyModal3 from "../ShowModal/ShowModal3";
import MyModal4 from "../ShowModal/ShowModal4";
import MyModal2 from "../ShowModal/ShowModal2";
import "../About/AboutHelper.css";
const AboutHelper=()=>{
    const navigate=useNavigate();
    const [userData,setUserData]=useState({});
    const [showModal4,setShowModal4]=useState(false);
    const [showModal2,setShowModal2]=useState(false);
    const [showModal3,setShowModal3]=useState(false);
    const closeModal3=()=>{setShowModal3(false);
   
    }
    const closeModal4=()=>{setShowModal4(false);
   
    }
    const closeModal2=()=>{setShowModal2(false);
   
    }
    const callAboutPage=async()=>{
        try{
        const res=await fetch("/aboutuser",{
        method:"GET",
        headers:{
        
           Accept:"application/json",
           "Content-Type":"application/json"
        },
        credentials:"include"
        
        
        });
        const data=await res.json();
       
        setUserData(data);
        if(!(await res).status===200){
           const error=new Error(res.error);
           throw error;
        }
    }
    catch(err){
    console.log(err);
    navigate("/usersignup",{replace:true});
    }
    }
   
    
       useEffect(()=>{
    callAboutPage();
       },[])
            
  
    return (
    <>
    <div className="abc">
    <div className="card-container">
      <span className="pro"  onClick={()=>{setShowModal4(true)}}>EDIT</span>
      <div className="profile-picture-container">
      < img className="round" src={"http://localhost:5000/public/images/"+userData.profpic} alt="user" />
      <div className="edit-icon">
            <RiImageEditFill size={30}  onClick={()=>setShowModal3(true)}/>
          </div>
          
          </div>
      <span className="pro2" onClick={()=>{setShowModal2(true)}}>DELETE</span>
      <h3>{userData.name}</h3>
      <h6 style={{textTransform:'lowercase'}}>{userData.email}</h6>
      <h6>{userData.phone}</h6>

      
      <h6>{userData.city},<span>{userData.state}</span></h6>
      
      {/* <div className="buttons">
        <button className="primary">
          Message
        </button>
        <button className="primary ghost">
          Following
        </button>
      </div> */}
      
    </div>
    </div>
    {showModal3 && <MyModal3  closeModal={closeModal3} pup={{id:userData._id,role:"user"}}/>}
    {showModal4 && <MyModal4  closeModal={closeModal4} pup={userData}/>}
    {showModal2 && <MyModal2  closeModal={closeModal2} pup={{id:userData._id,role:"user"}}/>}
    </>
    )}
    export default AboutHelper;