import React, { useEffect ,useContext} from "react";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../App";
const Logout=()=>{

    const {state,dispatch}=useContext(UserContext);
    
    
    const navigate=useNavigate();
  console.log(state.role);
    useEffect(()=>{
    fetch(`/logout${state.role}`,{
method:"GET",
headers:{
Accept:"Application/json",
"Content-Type":"application/json"

},
credentials:"include"
    }).then((res)=>{
        dispatch({type:"USER",payload: { user: null, role: null } });
        navigate("/",{replace:true});
if(!res.status===200){
const error=new Error(res.error);
throw error;
}
    }).catch((err)=>{
console.log(err);
    })

    },[]);
    
 


}
export default Logout;