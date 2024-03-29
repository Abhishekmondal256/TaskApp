import React, { useState, useEffect ,useContext} from 'react';
import { NavLink,json,useNavigate } from "react-router-dom";
import {UserContext} from "../../App";
import "../HelperTask/HelperTask.css";
const HelperTask=()=>{
    const [tasks, setTasks] = useState([]);
    
    const {state,dispatch}= useContext(UserContext);
    
    const navigate = useNavigate();
    
    const helperId=state.user;
    // console.log(helperId);
   // Function to fetch tasks from the backend
const fetchHelperTasks = async () => {
    try {
        // Make POST request to fetch helper tasks
        const response = await fetch('/helperTaskse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ helperId: helperId }) // Replace helperId with the actual helper's ID
        });

        if (!response.ok) {
            throw new Error('Failed to fetch helper tasks');
        }
        
        const data = await response.json();
        // Set fetched tasks to state
        setTasks(data);
        
    } catch (error) {
        console.error('Error fetching helper tasks:', error);
        // Handle error if needed
    }
};
useEffect(() => {
    fetchHelperTasks();
}, []); 

const getStatus = (task) => {
    

    if (task.taskgivenid) {
        return 'Accepted';
    } else if (task.taskrejectedid.includes(JSON.parse(helperId))) {
        
        return 'Rejected';
    } else {
        return 'Pending';
    }
};
const handleChatButtonClick =async (userId) => {
    navigate(`/helperchat`,{replace:true});
    dispatch({ type: "ADD_USER_ID", payload: { userId: userId } });
};

return(
<>
<div className="helper-tasks">
            <h2>My Tasks</h2>
            <div className="task-list">
            {tasks.map(task => (
               
                <div key={task._id} className="task-box">
                    
                        <h3 style={{textTransform: 'capitalize'}}>{task.taskdesc}</h3>
                        <p><strong>Task Id:</strong>{task._id}</p>
                        <p style={{textTransform: 'capitalize'}}><strong>User Name: </strong>{task.username}</p>
                        <p><strong>Phone: </strong>{task.userphone}</p>
                        <p><strong>Email: </strong>{task.useremail}</p>
                        <p style={{textTransform: 'capitalize'}}><strong>Skills:</strong> {task.skills.join(', ')}</p>
                        <p><strong>Start Date:</strong> {task.startdate}</p>
                        <p><strong>End Date:</strong> {task.lastdate}</p>
                        <p><strong>Location: </strong>{task.location}</p>
                        <p><strong>Cost Per Hour:</strong> {task.costperhr} Rs</p>
                       <div id="bu">
                        <p><strong>Status: </strong><p className={`status status-${getStatus(task).toLowerCase()}`}>{getStatus(task)}</p></p>
                        <button class="chat-button"onClick={() => handleChatButtonClick(task.userid)}>Chat</button>
                   </div>
                    </div>
                
            ))}
            </div>
        </div>



</>
)

}
export default HelperTask;