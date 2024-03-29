import React, { useEffect ,useState}  from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { RiImageEditFill } from "react-icons/ri";
import MyModal3 from "../ShowModal/ShowModal3";
import MyModal from "../ShowModal/ShowModal";
import MyModal2 from "../ShowModal/ShowModal2";
import "../About/AboutHelper.css";
const AboutHelper=()=>{
    const navigate=useNavigate();
    const [userData,setUserData]=useState({});
    const [showModal,setShowModal]=useState(false);
    const [showModal2,setShowModal2]=useState(false);
    const [showModal3,setShowModal3]=useState(false);
    const closeModal3=()=>{setShowModal3(false);
   
    }
    const closeModal=()=>{setShowModal(false);
   
    }
    const closeModal2=()=>{setShowModal2(false);
   
    }
    const callAboutPage=async()=>{
        try{
        const res=await fetch("/abouthelper",{
        method:"GET",
        headers:{
        
           Accept:"application/json",
           "Content-Type":"application/json"
        },
        credentials:"include"
        
        
        });
        const data=await res.json();
        console.log(data);
        setUserData(data);
        if(!(await res).status===200){
           const error=new Error(res.error);
           throw error;
        }
    }
    catch(err){
    console.log(err);
    navigate("/helperrsignup",{replace:true});
    }
    }
   
    
       useEffect(()=>{
    callAboutPage();
       },[])
            
  
    return (
    <>
    <div className="abc">
    <div className="card-container" >
      <span className="pro"  onClick={()=>{setShowModal(true)}}>EDIT</span>
      <div className="profile-picture-container" id="profile-picture-container">
      < img className="round" src={"http://localhost:5000/public/images/"+userData.profpic} alt="user"  />
      <div className="edit-icon">
            <RiImageEditFill size={30}  onClick={()=>setShowModal3(true)}/>
          </div>
          
          </div>
      <span className="pro2" onClick={()=>{setShowModal2(true)}}>DELETE</span>
      <h3 style={{textTransform: 'capitalize'}} >{userData.name}</h3>
      <h6 style={{textTransform:'lowercase'}}>{userData.email}</h6>
      <h6>{userData.phone}</h6>
 <p style={{textTransform: 'capitalize'}}>{userData.gender},{userData.age}</p>
      
      <h6>{userData.city},<span>{userData.state}</span></h6>
      
      {/* <div className="buttons">
        <button className="primary">
          Message
        </button>
        <button className="primary ghost">
          Following
        </button>
      </div> */}
      <div className="skills">
        <h6>Skills</h6>
        <ul>
        {userData.skills &&
                                userData.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
        </ul>
      </div>
    </div>
    </div>
    {showModal3 && <MyModal3  closeModal={closeModal3} pup={{id:userData._id,role:"helper"}}/>}
    {showModal && <MyModal  closeModal={closeModal} pup={userData}/>}
    {showModal2 && <MyModal2  closeModal={closeModal2} pup={{id:userData._id,role:"helper"}}/>}
    </>
    )}
    export default AboutHelper;