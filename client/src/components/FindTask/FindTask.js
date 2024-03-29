import React,{ useEffect ,useState,useContext} from "react";
import { NavLink,json,useNavigate } from "react-router-dom";
import "../FindTask/FindTask.css";
import {UserContext} from "../../App";
const FindTask=()=>{
    const {state,dispatch}= useContext(UserContext);
    const navigate = useNavigate();
    const [taskData,setTaskData]=useState([]);
    const [sortBy, setSortBy] = useState("");
// const callGetAllTasks=async()=>{
    
//     try{
//         const helperId=state.user;
//         const res=await fetch("/getalltasksnotinc",{
//             method:"POST",
//             headers:{
            
              
//                "Content-Type":"application/json"
//             },
//             body:JSON.stringify({helperId:helperId})
            
            
//             });
//             const data=await res.json();



// settaskData(data);

//             if(!(await res).status===200){
//                 const error=new Error(res.error);
//                 throw error;
//              }


// }
// catch(err){
//     console.log(err);
//     navigate("/",{replace:true});
//     }

// };
const callGetAllTasks = async () => {
    try {
        // Get user's current location using geolocation API
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                console.log(latitude);
                console.log(longitude);
                const helperId=state.user;
                const helpId=JSON.parse(helperId);
                const helperRes = await fetch(`/getHelperSkills/${helpId}`);
                const helperData = await helperRes.json();
                const helperSkills = helperData.skills;
                
                const res = await fetch("/getalltasksnotinc", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ helperId, latitude, longitude , helperSkills})
                    ,enableHighAccuracy: true,
                    maximumAge: 0,
                });
                const data = await res.json();
                setTaskData(data);
                
                if (!res.ok) {
                    throw new Error(data.error);
                }
            }, (error) => {    console.log(error);
            });
        } else {
            throw new Error("Geolocation is not supported by this browser.");
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
        navigate("/", { replace: true });
    }
};




useEffect(()=>{
    callGetAllTasks();
       },[])
    //    console.log(taskData);
    //    taskData.map(task => console.log(task.userid));
       const handleApply = async (taskId,userid) => {
        // Handle applying for the task with taskId
        // console.log("Applying for task with ID:", taskId);
        // console.log("Applying for task with User ID:", userid);
        const helpid=JSON.parse(state.user);
        // console.log("Applying for task with Helper ID:",helpid);
        const requestBody = JSON.stringify({
            taskId: taskId,
            userId: userid,
            helperId: helpid
        });
        const res = await fetch(`/applyTask/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: requestBody
        });
        const data=await res.json();
       
        if(res.status===400 || !data ){
          window.alert("Failed");
        }else{
        
          window.alert("Task Applied successfully");
          
          
        
          
        }
       }
       const sortByDistance = () => {
        // Sort tasks by distance (shorter distance at top)
        setTaskData([...taskData].sort((a, b) => a.distance - b.distance));
        setSortBy("distance");
    };

    const sortByPay = () => {
        // Sort tasks by pay (larger pay at top)
        setTaskData([...taskData].sort((a, b) => b.costperhr - a.costperhr));
        setSortBy("pay");
    };

    return(
<>
<div className="find-task-container">
            <h2>Find Tasks</h2>
            <div className="sort-dropdown">
                <button>Sort By</button>
                <div className="sort-dropdown-content">
                    <button onClick={sortByDistance}>Distance</button>
                    <button onClick={sortByPay}>Pay</button>
                </div>
            </div>
                  
            <div className="task-list">
                {taskData.map(task => (
                    <div key={task._id} className="task-card">
                        <p className="post-date">{task.postdate}</p>
                        <h3 style={{textTransform: 'capitalize'}}>{task.taskdesc}</h3>
                        <p><strong>Task Id: </strong>{task._id}</p>
                        <p style={{textTransform: 'capitalize'}}><strong>User Name: </strong>{task.username}</p>
                        <p><strong>User Email: </strong>{task.useremail}</p>
                        <p><strong>User Phone: </strong>{task.userphone}</p>
                        <p><strong>Location: </strong> {task.location}</p>
                        
                        <p style={{textTransform: 'capitalize'}}><strong>Skills Required: </strong> {task.skills.join(", ")}</p>
                        <p><strong>Preferred Date: </strong>{task.startdate} to {task.lastdate}</p>
                        <p><strong>Pay Per Hour: </strong>Rs {task.costperhr}  </p>
                        <p><strong>Distance: </strong>{task.distance} metres </p>
                        <button onClick={() => handleApply(task._id,task.userid)} class="apply-button">Apply</button>
                    </div>
                ))}
            </div>
        </div>


</>


    )
}
export default FindTask;