import React, { useState, useEffect ,useContext} from 'react';
import { useParams } from 'react-router-dom';
import "../UserTask/Usertaskapplication.css";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../App";
const Usertaskapplication=()=>{
    const { id } = useParams(); 
    const {state,dispatch}= useContext(UserContext);
    console.log(state);
    const userid=JSON.parse(state.user);
    
    const navigate=useNavigate();
    const [taskApplyIds, setTaskApplyIds] = useState([]);
    const [helperDetails, setHelperDetails] = useState([]);
    const fetchTaskApplyIds = async () => {
        try {
            const response = await fetch('/gettaskapplyid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ taskId: id })
            });
            
            const data = await response.json();
            setTaskApplyIds(data);
        } catch (error) {
            console.error('Error fetching task apply IDs:', error);
        }
    };
    const fetchHelperDetails = async () => {
        try {
            const response = await fetch('/helperdetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ helperIds: taskApplyIds })
            });
            const data = await response.json();
            setHelperDetails(data);
        } catch (error) {
            console.error('Error fetching helper details:', error);
        }
    };

    useEffect(() => {
        fetchTaskApplyIds();
    }, [id]);
    useEffect(() => {
        if (taskApplyIds.length > 0) {
            fetchHelperDetails();
        }
    }, [taskApplyIds]);
    
    const handleChat =async(helperId) => {
   
        navigate("/chat",{replace:true});
        dispatch({ type: "ADD_HELPER_ID", payload: { helperId: helperId } });
        // dispatch({type:"USER",payload: {userId:userid,helperId:helperId }});
        };
    
    const handleAccept = async(helperId) => {
        try {
            const response = await fetch(`/applyTask/${id}/accept`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({  helperId: helperId })
            });
    
            if (response.ok) {
                console.log('Helper accepted successfully:', helperId);
                window.alert("task accepted sucessfully");
                // Perform any additional actions after successful acceptance
            } else {
                console.error('Error accepting helper:', response.statusText);
            }
        } catch (error) {
            console.error('Error accepting helper:', error);
        }
    };

    const handleReject = async(helperId) => {
        try {
            const response = await fetch(`/applyTask/${id}/reject`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({  helperId: helperId })
            });
    
            if (response.ok) {
                console.log('Helper rejected successfully:', helperId);
                window.alert("task rejected sucessfully");
                // Perform any additional actions after successful acceptance
            } else {
                console.error('Error rejecting helper:', response.statusText);
            }
        } catch (error) {
            console.error('Error rejected helper:', error);
        }
    };
return(
<>
<div>
            <h2>User Task Applications</h2>
            <div className="application-container">
                {helperDetails.map(helper => (
                    <div key={helper._id} className="application-box">
                        <div className="helper-details">
                        <img src={"http://localhost:5000/public/images/"+helper.profpic} alt="Profile" className="profile-pic" />
                        <p><strong>Helper Id:</strong> {helper._id}</p>
                            <p><strong>Name:</strong> {helper.name}</p>
                            <p><strong>Email:</strong> {helper.email}</p>
                            <p><strong>Phone:</strong> {helper.phone}</p>
                            <p><strong>State:</strong> {helper.state}</p>
                            <p><strong>City:</strong> {helper.city}</p>
                        </div>
                        <div className="action-buttons">
                            <button onClick={() => handleChat(helper._id)}>Chat</button>
                            <button onClick={() => handleAccept(helper._id)}>Accept</button>
                            <button onClick={() => handleReject(helper._id)}>Reject</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

</>
)

}
export default Usertaskapplication;