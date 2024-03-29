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
    const MyModal5=({closeModal,pup})=>{
        
        
          const [userUpdate,setUserUpdate]=useState({
             taskdesc:pup.taskdesc, startdate:pup.startdate, lastdate:pup.lastdate, costperhr:pup.costperhr
             
          
            });
            const [selectedOptions,setSelectedOptions]=useState([]);
            useEffect(() => {
        
                setSelectedOptions(pup.skills.map(skill => ({ value: skill, label: skill })));
              }, [pup.skills]);
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
                   const handleUpdate=async(e)=>{
                    
                    
                    
                   try{ const requestBody = {
                      userUpdate: userUpdate,
                      selectedOptions: selectedOptions,
                      id:pup._id
                    };
                    const res=await fetch("/update7",{
   
                        method: 'PUT',
                        body:JSON.stringify(requestBody),
                        headers: {
                          'Content-Type': 'application/json'
                        }
                      })
                      if (res.status === 422) {
                        window.alert("incomplete form submission");
                      }
                      else{const data = await res.json();
                      }
                    } catch (err) {
                      console.log(err);
                    }
                    
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
                            <div className="form-group newformgroup"><div id="lab newlab">Task Description</div>
         <div id="lab2"> <label for="taskdesc">
       
        </label>
       <input type="text" name="taskdesc" id="taskdesc" autoComplete="off" value={userUpdate.taskdesc} onChange={handleInputsUpdate}/>
    
       </div> </div>
       <div className="form-group newformgroup"><div id="lab">Start Date</div>
      <div id="lab2"> <label for="startdate">
       
        </label>
       <input type="date" name="startdate" id="startdate"  autoComplete="off" value={userUpdate.startdate} onChange={handleInputsUpdate} style={{ width: "62%" }} />
    
        </div></div>
        <div className="form-group newformgroup"><div id="lab">Last Date</div>
      <div id="lab2"> <label for="lastdate">
       
        </label>
       <input type="date" name="lastdate" id="lastdate"  autoComplete="off" value={userUpdate.lastdate} onChange={handleInputsUpdate} style={{ width: "62%" }} />
    
        </div></div>
        <div className="form-group newformgroup"><div id="lab">Cost Per Hour (Rs)</div>
      <div id="lab2"> <label for="costperhr">
       
        </label>
       <input type="number" name="costperhr" id="costperhr"  autoComplete="off" value={userUpdate.costperhr} onChange={handleInputsUpdate} />
    
        </div></div>
        <div className="form-group newformgroup"><div id="lab">Skills</div>
      <div id="lab2"> <label for="skills">
       
        </label>
        <Select options={options} value={selectedOptions} onChange={handleSkills} isMulti={true}/>
       </div> </div>
       <div className="newformgroupbtn">
     <button type="button" className="model-btn" onClick={()=>{handleUpdate();closeModal();}} >Update</button>
     </div>
    </form>
    </div>
</>,document.querySelector(".myPortalModalDiv")

)



}
export default MyModal5;