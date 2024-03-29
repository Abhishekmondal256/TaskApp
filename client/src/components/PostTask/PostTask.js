import React,{ useEffect ,useState,useContext} from "react";
import { NavLink,useNavigate } from "react-router-dom";
import Select from "react-select";
import {UserContext} from "../../App";
import "../PostTask/PostTask.css";
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
const PostTask=()=>{
    const {state,dispatch}= useContext(UserContext);
    const navigate=useNavigate();
    const [userData,setUserData]=useState({});
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [userid,setuserid]=useState({});
    const [taskData, setTaskData] = useState({
        description: "",
        startDate: "",
        endDate: "",
        latitude:"",
        longitude:"",
        fullAddress:"",
        costperhr:""

    });
    
    const [selectedOptions,setSelectedOptions]=useState([]);
    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };
    const handleSkills = (selectedOption) => {
        setSelectedOptions(selectedOption);
 
         
       };
       let apiEndPoint="https://api.opencagedata.com/geocode/v1/json";
        let apiKey="3b747832340c45ea9fb1c1ae32ee094d";
const getUserCurrentAddress=async(latitude,longitude)=>{
let query=`${latitude},${longitude}`;
let apiUrl=`${apiEndPoint}?key=${apiKey}&q=${query}&pretty=1`;
try{
const res=await fetch(apiUrl);
const data=await res.json();
if (data.results && data.results.length > 0) {
    const formattedAddress = data.results[0].formatted;
    setTaskData((prevTaskData) => ({
        ...prevTaskData,
        fullAddress: formattedAddress
    }));
} else {
    console.log("Address not found");
}

} 
catch(error){
console.log(error);

}

}


       const getLocation=async()=>{
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition((position)=>{
    const { latitude, longitude } = position.coords;
    setTaskData((prevTaskData) => ({
        ...prevTaskData,
        latitude: latitude.toString(),
        longitude: longitude.toString()
    }));
    getUserCurrentAddress(latitude,longitude);
},
(error)=>{
    console.log(error);
},
{
    enableHighAccuracy: true, // Enable high accuracy mode
    maximumAge: 0, // Don't use cached positions
     // Set a timeout of 10 seconds
}
)



}


       }
   
   
   
    const callPostTaskPage=async()=>{
        
        try{
            const res=await fetch("/posttask",{
                method:"GET",
                headers:{
                
                   Accept:"application/json",
                   "Content-Type":"application/json"
                },
                credentials:"include"
                
                
                });
                const data=await res.json();
    
                 setuserid(data._id);
        
           
       
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
    const getDateT=async()=>{
        const date = new Date();
        
        const dateStr = date.toISOString().split('T')[0]; // Extract date
        const timeStr = date.toISOString().split('T')[1].split('.')[0]; // Extract time
        setCurrentDate(dateStr);
        setCurrentTime(timeStr);



    }
    const handleSubmit = async (e) => {
        e.preventDefault();
      try{
        console.log("yaha o");
        const selectedSkills = selectedOptions.map(option => option.value);
        // const formData=new FormData();
        // formData.append("userid",userid);
        
        // formData.append("taskdesc",taskData.description);
        // selectedOptions.forEach((option) => {
        //     formData.append("skills[]", option.value); 
        //   });
        // formData.append("startdate",taskData.startDate);
        // formData.append("lastdate",taskData.endDate);
        // formData.append("latitude",taskData.latitude);
        // formData.append("longitude",taskData.longitude);
        // formData.append("location",taskData.fullAddress);
       await getDateT();
        

       const res = await fetch("/posttaskdata", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({userid,taskData,selectedOptions: selectedSkills,currentDate,currentTime,username:state.name,userphone:state.phone,useremail:state.email})
    });
        console.log("yaha op");
        if (res.status === 422) {
            
            window.alert("incomplete or wrong submission");
        } else {
            const data = await res.json();
            window.alert("Task Posted successfully");
            navigate("/", { replace: true });
        }
          
        }
    catch(err){
        console.log(err);
    }
    }

    useEffect(()=>{
        callPostTaskPage();
           },[])
         

    return (
    <>
     <div className="post-task-container">
          
                <form className="post-task-form" method="POST" >
                    <div>
                        <label htmlFor="description">Task Description:</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={taskData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="skills">Skills:</label>
                        <Select options={options} value={selectedOptions} onChange={handleSkills} isMulti={true}/>

                    </div>

                    <div>
                        <label htmlFor="startDate">Start Date:</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={taskData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate">End Date:</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={taskData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="costperhr">Cost Per Hour:(Rs)</label>
                        <input
                            type="number"
                            id="costperhr"
                            name="costperhr"
                            value={taskData.costperhr}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="geoBtn" id="geoBtn" type="button" onClick={getLocation}>Location</button>
                    <button type="submit" onClick={handleSubmit} >Submit</button>
                   
                </form>
            
        </div>
    </>
    )
    
}
export default PostTask;