const express=require("express");
const router=express.Router();
const User = require("../model/userSchema");
const Helper=require("../model/helperSchema");
const Task=require("../model/taskSchema");
const Chat=require("../model/chatSchema");
const Message=require("../model/messageSchema");
const bcrypt = require("bcryptjs");
const multer=require("multer");
const jwt=require("jsonwebtoken");
const nodemailer=require("nodemailer");
require("../db/conn");
const cookieParser=require("cookie-parser");
router.use(cookieParser());
const authenticate=require("../middleware/authenticate");
const authenticate2=require("../middleware/authenticate2");
const geolib = require('geolib');
const MAX_DISTANCE_KM = 5; 
const storage=multer.diskStorage({destination:function(req,file,cb){
  cb(null,"public/images");
  
  },
  filename:function(req,file,cb){
  cb(null,Date.now()+'_'+ file.originalname);
  
  }
  })
  var upload=multer({storage:storage});
router.get("/",(req,res)=>{
    res.send("hello bhai");
});
router.post("/userregister",upload.single("profpic"),async(req,res)=>{
  let profpic=req.file.filename;
  const {name,email,phone,state,city,password,cpassword}=req.body;
  if (!name || !email || !phone  ||!state || !city || !password || !cpassword) {
   
    return res.status(422).json({ error: "plz fill all the deatils" });
  }
  if(password!==cpassword){
    return res.status(422).json({ error: "plz fill correct" });
  }
  try {
    const userExist = await User.findOne({ email: email })
    if (userExist) {
      return res.status(422).json({ error: "Email already registered" });
    }

    const user = new User({ name, email, phone, state, city,profpic, password, cpassword });
    const userData=await user.save();
console.log(userData);

    // res.status(201).json({ message: "user registered successfully" });
    
res.status(201).json({message:"Registration Successfull,plz Verify the email"});



  }
  catch (err) {
    console.log(err);
  }
  
});


router.post("/usersignin", async (req, res) => {
    try {
        let token;
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "plz filled the data" });
  
      }
      const userLogin = await User.findOne({ email: email });
      if (userLogin) {
        const isMatch = await bcrypt.compare(password, userLogin.password);
        token = await userLogin.generateAuthToken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true
  
        })
      
    
        if (!isMatch) {
          res.status(400).json({ error: "Invalid credentials" });
        }
        else {
          const id=JSON.stringify(userLogin._id);
          const name=JSON.stringify(userLogin.name);
          const phone=JSON.stringify(userLogin.phone);
          const email=JSON.stringify(userLogin.email);
          res.json({ id:id,name:name,email:email,phone:phone, message: "user login successfully" });
        }
      }
      else {
        res.status(400).json({ error: "Invalid credentials" });
  
      }
  
  
  
  
  
    }
    catch (err) {
      console.log(err);
  
    }
  
  });
  router.post("/helperregister",upload.single("profpic"),async(req,res)=>{
    const {name,email,phone,state,city,gender,age,skills,password,cpassword}=req.body;
   
    let profpic=req.file.filename;
   
    if (!name || !email || !phone  ||!state  ||!gender || !age ||!city || !password || !cpassword) {
    
      return res.status(422).json({ error: "plz fill all the deatils" });
    }
    if(password!==cpassword){
      return res.status(422).json({ error: "plz fill correct" });
    }
    try {
      const userExist = await Helper.findOne({ email: email })
      if (userExist) {
        return res.status(422).json({ error: "Email already registered" });
      }
  
      const user = new Helper({ name, email, phone, state, city,profpic,gender,age,skills, password, cpassword });
      console.log(user);
      await user.save();
  
  
      res.status(201).json({ message: "user registered successfully" });
  
  
  
  
    }
    catch (err) {
      console.log(err);
    }
    
  });
  router.post("/helpersignin", async (req, res) => {
    try {
        let token;
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "plz filled the data" });
  
      }
      const userLogin = await Helper.findOne({ email: email });
      if (userLogin) {
        const isMatch = await bcrypt.compare(password, userLogin.password);
        token = await userLogin.generateAuthToken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true
  
        })
      
    
        if (!isMatch) {
          res.status(400).json({ error: "Invalid credentials" });
        }
        else {
     const id=JSON.stringify(userLogin._id);
    
          res.json({ id:id ,message: "user login successfully" });
        }
      }
      else {
        res.status(400).json({ error: "Invalid credentials" });
  
      }
  
  
  
  
  
    }
    catch (err) {
      console.log(err);
  
    }
  
  });
  router.get("/logoutuser",authenticate,async (req,res)=>{
    console.log("hello my slogout");
     req.rootUser.tokens=req.rootUser.tokens.filter((curElem)=>{
      return curElem.token !== req.token
     })
      await req.rootUser.save();
    res.clearCookie("jwtoken",{path:"/"});
    
    res.status(200).send("User Logout");
    
    })
    router.get("/logouthelper",authenticate2,async (req,res)=>{
      console.log("hello my slogout");
       req.rootUser.tokens=req.rootUser.tokens.filter((curElem)=>{
        return curElem.token !== req.token
       })
        await req.rootUser.save();
      res.clearCookie("jwtoken",{path:"/"});
      
      res.status(200).send("User Logout");
      
      })
      router.get("/aboutuser",authenticate,(req,res)=>{
        
        res.send(req.rootUser);
        
        })
        router.get("/abouthelper",authenticate2,(req,res)=>{

          res.send(req.rootUser);
          
          })
          router.put("/update2", upload.single('profpic'),async(req,res)=>{

            const recordId = req.body._id;
           const role=req.body.role;
            const newData=req.body;
            
            if (req.file) {
              var path = require('path');
              newData.profpic = path.basename(req.file.path); // Assuming the file path is stored as the image field
            }
            try{
                
             
              if(role=="user"){
                User.findByIdAndUpdate(recordId, { $set: newData }, { new: true })
                .then((updatedRecord) => {
                  if (updatedRecord) {
                    res.json(updatedRecord);
                  } else {
                    res.status(404).json({ error: 'Record not found' });
                  }
                })
                .catch((error) => {
                  res.status(500).json({ error: 'Internal server error' });
                });


              }else{
             Helper.findByIdAndUpdate(recordId, { $set: newData }, { new: true })
              .then((updatedRecord) => {
                if (updatedRecord) {
                  res.json(updatedRecord);
                } else {
                  res.status(404).json({ error: 'Record not found' });
                }
              })
              .catch((error) => {
                res.status(500).json({ error: 'Internal server error' });
              });
          
             
           }
            
            
            }
          
            catch(err){
              res.status(500).json({message:"internal server error occurred"});
              
            }
          
          })
          router.put("/update", upload.single('profpic'),async(req,res)=>{
            console.log(req.body);
           
          console.log(req.params);
            const recordId = req.body._id;
            const newData = req.body;
            
            // If an image was uploaded, update the image field in the newData object
            if (req.file) {
              var path = require('path');
              newData.profpic = path.basename(req.file.path); // Assuming the file path is stored as the image field
            }
          
            
            if (!newData.name || !newData.email || !newData.phone || !newData.gender ||!newData.skills || !newData.age  ||!newData.state || !newData.city || !newData.password || !newData.cpassword) {
             
              return res.status(422).json({ error: "plz fill all the deatils" });
            }
            if(newData.password!==newData.cpassword){
              return res.status(422).json({ error: "plz fill correct" });
            }
            try{
              if(newData.name!==null){
                newData.name=newData.name.toLowerCase();}
                if(newData.email!==null){
                  newData.email=newData.email.toLowerCase();}
                  if(newData.phone!==null){
                    newData.phone=newData.phone;}
                    if(newData.skills!==null){
                      newData.skills=newData.skills;}
                if(newData.gender!==null){
                newData.gender=newData.gender.toLowerCase();}
                if(newData.state!==null){
                newData.state=newData.state.toLowerCase();}
                if(newData.city!==null){
                newData.city=newData.city.toLowerCase();}
                if(newData.gender!==null){
                  newData.gender=newData.gender.toLowerCase();}
                if(newData.password!==null){
                newData.password= await bcrypt.hash(newData.password,5);}
                if(newData.cpassword!==null){
                  newData.cpassword= await bcrypt.hash(newData.cpassword,5);}
                  
                
                Helper.findByIdAndUpdate(recordId, { $set: newData }, { new: true })
                .then((updatedRecord) => {
                  if (updatedRecord) {
                    res.json(updatedRecord);
                  } else {
                    res.status(404).json({ error: 'Record not found' });
                  }
                })
                .catch((error) => {
                  res.status(500).json({ error: 'Internal server error' });
                });
            
              }
              
            catch(err){
              console.log(err);
              res.status(500).json({message:"internal server error occurred"});
            }
            
          })            
          router.delete("/delete",async (req, res) =>{
            try{
              
            const documentId =req.body.id;
            const roley=req.body.role;
            console.log(roley);
            if(roley=="helper"){
            const result = await Helper.deleteOne({ _id: documentId });
            console.log(result);
            if (result.deletedCount > 0) {
              res.send('Document deleted successfully.');
              
          
            } else {
              res.status(404).send('Document not found.');
            }
            }
            else{
              console.log(documentId);
              const result = await User.deleteOne({ _id: documentId });
              console.log(result);
              if (result.deletedCount > 0) {
                res.send('Document deleted successfully.');
                
            
              } else {
                res.status(404).send('Document not found.');
              }
              }

            }



            
            
            catch(err){
              console.error(err);
              res.status(500).send('Internal Server Error');
          
            }
          
          })
          router.put("/updatee", upload.single('profpic'),async(req,res)=>{

            const recordId = req.body._id;
            const newData = req.body;
            console.log(recordId);
            console.log(newData);
            if (req.file) {
              var path = require('path');
              newData.profpic = path.basename(req.file.path); 
            }
          
            
            if (!newData.name || !newData.email || !newData.phone   ||!newData.state || !newData.city || !newData.password || !newData.cpassword) {
             
              return res.status(422).json({ error: "plz fill all the deatils" });
            }
            if(newData.password!==newData.cpassword){
              return res.status(422).json({ error: "plz fill correct" });
            }
            try{
              if(newData.name!==null){
                newData.name=newData.name.toLowerCase();}
                if(newData.phone!==null){
                  newData.phone=newData.phone}
                  if(newData.email!==null){
                    newData.email=newData.email.toLowerCase();}
                if(newData.state!==null){
                newData.state=newData.state.toLowerCase();}
                if(newData.city!==null){
                newData.city=newData.city.toLowerCase();}
               
                if(newData.password!==null){
                newData.password= await bcrypt.hash(newData.password,5);}
                if(newData.cpassword!==null){
                  newData.cpassword= await bcrypt.hash(newData.cpassword,5);}
                  
                // newData.cpassword= await bcrypt.hash(newData.cpassword,5);
               User.findByIdAndUpdate(recordId, { $set: newData }, { new: true })
                .then((updatedRecord) => {
                  if (updatedRecord) {
                    res.json(updatedRecord);
                  } else {
                    res.status(404).json({ error: 'Record not found' });
                  }
                })
                .catch((error) => {
                  res.status(500).json({ error: 'Internal server error' });
                });
            
              }
              
            catch(err){
              console.log(err);
              res.status(500).json({message:"internal server error occurred"});
            }
            
          })            
          router.get("/posttask",authenticate,(req,res)=>{
        
            res.send(req.rootUser);
            
            })

            router.post("/posttaskdata",async(req,res)=>{
              console.log("yaha");
              const username=JSON.parse(req.body.username);
              const userphone=JSON.parse(req.body.userphone);
              
              const useremail=JSON.parse(req.body.useremail);
              const userid=req.body.userid;
              const taskdesc=req.body.taskData.description;
              const skills=req.body.selectedOptions;
              const startdate=req.body.taskData.startDate;
              const lastdate=req.body.taskData.endDate;
              const postdate=req.body.currentDate;
              const posttime=req.body.currentTime;
              const latitude=req.body.taskData.latitude;
              const longitude=req.body.taskData.longitude;
              const location=req.body.taskData.fullAddress;
              const costperhr=req.body.taskData.costperhr;
              // console.log(userid);
              // console.log(taskdesc);
              // console.log(skills);
              // console.log(startdate);
              // console.log(lastdate);
              // console.log(postdate);
              // console.log(posttime);
              // console.log(latitude);
              // console.log(longitude);
              // console.log(location);
              if (!userid || !taskdesc || !startdate ||!lastdate || !latitude || !longitude || !location ||!skills || !postdate || !posttime || !costperhr || !useremail || !userphone || !username) {
    
              
                return res.status(422).json({ error: "plz fill all the deatils" });
              }
              const user = new Task({ userid,username,userphone,useremail,taskdesc, skills,startdate, lastdate,postdate,posttime ,latitude,longitude,location,costperhr});
              
              await user.save();
          
          
              res.status(201).json({ message: "Task posted successfully" });
              
            })
            router.get("/getalltasks",async(req,res)=>{
              try{const tasks = await Task.find({ taskgivenid: { $exists: false } });
              res.json(tasks); // Send tasks as JSON response
          } catch (error) {
              console.error("Error fetching tasks:", error);
              res.status(500).json({ error: "Failed to fetch tasks" }); // Send error response
          }


            });
            router.get('/getHelperSkills/:helpId', async (req, res) => {
              try {
                  const { helpId } = req.params;
                  
                  const helper = await Helper.findById(helpId);
                  if (!helper) {
                      return res.status(404).json({ error: "Helper not found" });
                  }
                  // Send helper's skills in the response
                  res.json({ skills: helper.skills });
              } catch (error) {
                  console.error("Error fetching helper's skills:", error);
                  res.status(500).json({ error: "Failed to fetch helper's skills" });
              }
          });
            router.post("/getalltasksnotinc",async(req,res)=>{
              try{ 
                const { helperId, latitude, longitude,helperSkills } = req.body;
                const he=JSON.parse(helperId);
                console.log(latitude);
                console.log(longitude);
                // console.log(helperSkills);
                let tasks = await Task.find({ taskgivenid: { $exists: false } , taskapplyid:{$nin:[he]}, skills: { $in: helperSkills } });
              // console.log(tasks);
              tasks = tasks.map(task => {
                const taskDistance = geolib.getDistance(
                    { latitude: parseFloat(task.latitude), longitude: parseFloat(task.longitude) },
                    { latitude: parseFloat(latitude), longitude: parseFloat(longitude) }
                );
                return {
                    ...task.toJSON(),
                    distance: taskDistance // Distance in meters
                };
            });
            console.log(tasks);
            tasks = tasks.filter(task => task.distance <= MAX_DISTANCE_KM * 1000);
            // console.log(tasks);
                res.json(tasks); // Send tasks as JSON response
              
          } catch (error) {
              console.error("Error fetching tasks:", error);
              res.status(500).json({ error: "Failed to fetch tasks" }); // Send error response
          }


            })

            router.put("/applyTask/:taskId",async(req,res)=>{
              try{const { taskId } = req.params;
              const { userId, helperId } = req.body;
          
              const updatedTask = await Task.findOneAndUpdate(
                { _id: taskId },
                { $addToSet: { taskapplyid: helperId } },
                { new: true } // Return the updated document
            );
            if (!updatedTask) {
              return res.status(404).json({ message: "Task not found" });
          }
  
          res.status(200).json({ message: "Task updated successfully", updatedTask });
      } catch (error) {
          console.error("Error updating task:", error);
          res.status(500).json({ message: "Internal server error" });
      }    
              



            })

router.post("/usertaske",async(req,res)=>{
const userId=req.body.userId;
try {
  const tasks = await Task.find({ userid: userId });
  res.json(tasks);
} catch (error) {
  console.error('Error fetching tasks by user:', error);
  res.status(500).json({ message: 'Internal server error' });
}



})
router.put("/update7",async(req,res)=>{
 
           
  // console.log(req.params);
    const recordId = req.body.id;
    const newData = req.body;
    
    // If an image was uploaded, update the image field in the newData object
    
  
    
    if (!newData.userUpdate.taskdesc || !newData.userUpdate.startdate || !newData.userUpdate.lastdate|| !newData.userUpdate.costperhr || ! newData.selectedOptions) {
     
      return res.status(422).json({ error: "plz fill all the deatils" });
    }
  
    try{
      if(newData.userUpdate.taskdesc!==null){
        newData.taskdesc=newData.userUpdate.taskdesc;}
        if(newData.userUpdate.startdate!==null){
          newData.startdate=newData.userUpdate.startdate;}
          if(newData.userUpdate.lastdate!==null){
            newData.lastdate=newData.userUpdate.lastdate;}
            if(newData.userUpdate.costperhr!==null){
              newData.costperhr=newData.userUpdate.costperhr;}
              
              if(newData.selectedOptions!==null){
                newData.skills = newData.selectedOptions.map(option => option.value);}
console.log(newData.skills);
         
        
        Task.findByIdAndUpdate(recordId, { $set: newData }, { new: true })
        .then((updatedRecord) => {
          if (updatedRecord) {
            res.json(updatedRecord);
          } else {
            res.status(404).json({ error: 'Record not found' });
          }
        })
        .catch((error) => {
          
          res.status(500).json({ error: 'Internal server error' });
        });
    
      }
      
    catch(err){
      console.log(err);
      res.status(500).json({message:"internal server error occurred"});
    }



})
router.delete("/deletee",async (req, res) =>{
  try{
    const documentId =req.body.id;
    console.log(documentId);
    const result = await Task.deleteOne({ _id: documentId });
    console.log(result);
    if (result.deletedCount > 0) {
      res.send('Document deleted successfully.');
      
  
    } else {
      res.status(404).send('Document not found.');
    }
  } catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');

  }
});
router.post("/gettaskapplyid",async(req,res)=>{
  const { taskId } = req.body;
  console.log(taskId);
  try {
    
    const task= await Task.findById(taskId);
    
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    // Extract taskapplyid from the task document
  //   if (task.taskgivenid) {
  //     taskApplyIds = task.taskapplyid.filter(id => !task.taskgivenid.includes(id) && !task.taskrejectedid.includes(id));
  // } else {
  //     taskApplyIds = task.taskapplyid.filter(id => !task.taskrejectedid.includes(id));
  // }
  const taskApplyIds = task.taskapplyid.map(id => {
    let status = 'pending';
    if (task.taskgivenid && task.taskgivenid.includes(id)) {
        status = 'accepted';
    } else if (task.taskrejectedid && task.taskrejectedid.includes(id)) {
        status = 'rejected';
    }
    return { id, status };
});
  res.json({ taskApplyIds });
    // Send taskapplyid as JSON response
} catch (error) {
    console.error('Error fetching task apply IDs:', error);
    res.status(500).json({ message: 'Server error' });
}


})
router.post("/helperdetails",async(req,res)=>{
  try {
  const { helperIds } = req.body;
  const helpers = await Helper.find({ _id: { $in: helperIds.map(item => item.id) } });
  
  if (!helpers) {
    return res.status(404).json({ message: "Helpers not found" });
}
console.log(helperIds);
const response = helpers.map(helper => {
  const { _id, name, email, phone, state, city ,profpic} = helper;
  
  
  const statusObj = helperIds.find(item =>item.id == _id);
  
  const status = statusObj ? statusObj.status : 'unknown';
  return { _id, name, email, phone, state, city, profpic,status };
});
console.log(response);
res.json(response);
} catch (error) {
console.error('Error fetching helper details:', error);
res.status(500).json({ message: "Internal server error" });
}

})
router.put('/applyTask/:taskId/accept', async (req, res) => {
  const { taskId } = req.params;
  const {  helperId } = req.body;

  try {
      // Find the task by taskId
      const task = await Task.findById(taskId);
      if (!task) {
          return res.status(404).json({ message: 'Task not found' });
      }

      // Update taskgivenid with the helperId
      task.taskgivenid = helperId;
      task.status='accepted';
      await task.save();

      res.status(200).json({ message: 'Helper accepted successfully' });
  } catch (error) {
      console.error('Error accepting helper:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});
router.put('/applyTask/:taskId/accept', async (req, res) => {
  const { taskId } = req.params;
  const {  helperId } = req.body;

  try {
      // Find the task by taskId
      const task = await Task.findById(taskId);
      if (!task) {
          return res.status(404).json({ message: 'Task not found' });
      }

      // Update taskgivenid with the helperId
      task.taskgivenid = helperId;
      
      await task.save();

      res.status(200).json({ message: 'Helper accepted successfully' });
  } catch (error) {
      console.error('Error accepting helper:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});
router.put('/applyTask/:taskId/reject', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { helperId } = req.body;

    // Find the task by taskId
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Add helperId to taskrejectedid array
    task.taskrejectedid.push(helperId);
    task.status='rejected';
    // Save the updated task
    await task.save();

    return res.status(200).json({ message: "Helper ID added to taskrejectedid array successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }


});
router.post("/helperTaskse",async(req,res)=>{
  try {
    const { helperId } = req.body;
    const he=JSON.parse(helperId);
    // Find tasks where helperId exists in taskapplyid array
    
    const tasks = await Task.find({ taskapplyid: he });
   

    res.json(tasks); // Send tasks as JSON response
} catch (error) {
    console.error("Error fetching helper tasks:", error);
    res.status(500).json({ error: "Failed to fetch helper tasks" }); // Send error response
}


})
// router.post("/chat",authenticate,async(req,res)=>{
//   const {userId,helperId}=req.body;
//   try {
//     if (!userId || !helperId) {
//         console.log("userId or helperId not provided");
//         return res.sendStatus(400);
//     }

    
//     const chats = await Chat.find({
//         users: { $all: [userId, helperId] }
//     }).sort({ latestMessage: -1 }); 

//     // Get messages for each chat
//     const chatsWithMessages = await Promise.all(chats.map(async (chat) => {
//         const messages = await Message.find({ chat: chat._id }).sort({ timestamps: 1 });
//         return { chat, messages };
//     }));
//     res.json(chatsWithMessages);
//   } catch (error) {
//       console.error("Error retrieving chats:", error);
//       res.status(500).json({ error: "Internal server error" });
//   }


// })
router.post("/chat", authenticate, async (req, res) => {
  const { userId, helperId } = req.body;
  // console.log(req.body);
  try {
      if (!userId || !helperId) {
          console.log("userId or helperId not provided");
          return res.sendStatus(400);
      }

      // Find the chat based on the user and helper IDs
      let chat = await Chat.findOne({
          user: userId,
          helper: helperId
      }).sort({ createdAt: -1 });

      // If no chat exists, create a new chat
      if (!chat) {
          chat = await Chat.create({ user: userId, helper: helperId });
      }
     
      const helper = await Helper.findById(helperId);
      const helperName = helper ? helper.name : ""; 
      // Get messages for the chat
     
      const messages = await Message.find({ chat: chat._id }).sort({ createdAt: 1 });
     
      const responseData = {
        chat: chat,
        chatId: chat._id, // Include the chatId in the response
        messages: messages,
        helperName: helperName,
        
    };
    res.json(responseData);
  } catch (error) {
      console.error("Error retrieving chat:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/send-message", authenticate, async (req, res) => {
  const { userId, helperId, content,chatId } = req.body;
  console.log(req.body);
  try {
      if (!userId || !helperId || !content || !chatId) {
          console.log("userId, helperId,  content or ChatId not provided");
          return res.sendStatus(400);
      }

      // Create a new message
      const message = await Message.create({
          userSender: userId,
          helperReceiver: helperId,
          content: content,
          chat: chatId // Assuming you also send the chatId in the request body
      });

      res.json(message);
  } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/chat2", authenticate2, async (req, res) => {
  const { userId, helperId } = req.body;
  // console.log(req.body);
  try {
      if (!userId || !helperId) {
          console.log("userId or helperId not provided");
          return res.sendStatus(400);
      }

      // Find the chat based on the user and helper IDs
      let chat = await Chat.findOne({
          user: userId,
          helper: helperId
      }).sort({ createdAt: -1 });

      // If no chat exists, create a new chat
      if (!chat) {
          chat = await Chat.create({ user: userId, helper: helperId });
      }
     
      
      // Get messages for the chat
      const user= await User.findById(userId);
      const userName = user ? user.name : ""; 
      const messages = await Message.find({ chat: chat._id }).sort({ createdAt: 1 });
     
      const responseData = {
        chat: chat,
        chatId: chat._id, // Include the chatId in the response
        messages: messages,
        
        userName:userName
    };
    res.json(responseData);
  } catch (error) {
      console.error("Error retrieving chat:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/send-message2", authenticate2, async (req, res) => {
  const { userId, helperId, content,chatId } = req.body;
  console.log(req.body);
  try {
      if (!userId || !helperId || !content || !chatId) {
          console.log("userId, helperId,  content or ChatId not provided");
          return res.sendStatus(400);
      }

      // Create a new message
      const message = await Message.create({
          helperSender: helperId,
          userReceiver: userId,
          content: content,
          chat: chatId // Assuming you also send the chatId in the request body
      });
          
      res.json(message);
  } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});
module.exports=router;