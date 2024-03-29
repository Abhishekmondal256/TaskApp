import React, { useState, useEffect,useContext } from 'react';
import {UserContext} from "../../App";
import "../UserTask/UserTask.css";
import MyModal5 from "../ShowModal/ShowModal5";
import MyModal6 from "../ShowModal/ShowModal6";
import { useNavigate } from 'react-router-dom';
const UserTask=()=>{
   
    const [tasks, setTasks] = useState([]);
    const {state,dispatch}= useContext(UserContext);
    const [showModal5,setShowModal5]=useState(false);
    const [showModal6,setShowModal6]=useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const navigate = useNavigate();
    const closeModal5=()=>{setShowModal5(false);
   
    }
    const closeModal6=()=>{setShowModal6(false);
   
    }
  const fetchTasks=async()=>{
try{
   
    const userId = JSON.parse(state.user);
    
    const res=await fetch("/usertaske",{
        method:"POST",
        headers:{
        
            "Content-Type": "application/json"
        },
       
        body: JSON.stringify({ userId: userId })
        
        });
        const data=await res.json();



setTasks(data);


}
 catch(err){
    console.log(err);
 }


  }
const handleapplication=async(id)=>{
navigate(`/usertask/${id}`);
   



}

    useEffect(() => {
        // Fetch tasks posted by the user from the backend
        fetchTasks();
    }, []);
   
    return(
        <>
         <div className="user-task-container">
            <h2 >Tasks Posted by User</h2>
            {tasks.map((task, index)=> (
                <div key={task._id} className="task-item" id="task-item" style={{ animationDelay: `${index * 0.1}s` }}>
                    <p >  {task.posttime} , {task.postdate}</p>
                    <h3 style={{textTransform: 'capitalize'}}>{task.taskdesc}</h3>
                    <p style={{textTransform: 'capitalize'}}><strong>Skills required:</strong> {task.skills.join(', ')}</p>
                    <p><strong>Task Id: </strong>{task._id}</p>
                    <p><strong>Start Date: </strong>{task.startdate}</p>
                    <p><strong>Last Date:</strong> {task.lastdate}</p>
                    <p><strong>Cost Per Hr:</strong> {task.costperhr}</p>
                    <button className='btn1' onClick={()=>{ setSelectedTask(task); setShowModal5(true)}}>Edit</button>
                    <button className='btn2' onClick={()=>{ setSelectedTask(task); setShowModal6(true)}}>Delete</button>
                    <button className='btn3' onClick={() => handleapplication(task._id)}>Applications</button>
                    {/* Add more task details as needed */}
                    {/* <button onClick={() => handleViewApplications(task._id)}>View Applications</button> */}
                    {/* Additional buttons or links for accept, reject, chat */}
                 </div>
                 
            )) }
            {showModal5 && <MyModal5  closeModal={closeModal5} pup={selectedTask}/>}
            {showModal6 && <MyModal6  closeModal={closeModal6} pup={selectedTask}/>}
        </div>
         
        

        </>
        )

}
export default UserTask;