const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const taskSchema=new mongoose.Schema({
userid:{
    type:String,
    required:true
},
username:{
    type:String,
    required:true
},
userphone:{
    type:String,
    required:true
},
useremail:{
    type:String,
    required:true
},
taskdesc:{
    type:String,
    required:true 
},
skills: [{
    type: String,
    required:true
}],
startdate:{
    type: String,
    required:true  
},

lastdate:{
    type: String,
    required:true    
},
postdate:{
    type:String,
    required:true
},
posttime:{
    type:String,
    required:true
},
latitude:{
    type: String,
    required:true   
},
longitude:{
    type: String,
    required:true  
},
location:{
    type: String,
    required:true  
},
costperhr:{
    type:Number,
    required:true
},
taskapplyid:[{
    type:String
}],
taskgivenid:{
    type:String
},

    taskrejectedid:[
        {
            type:String
        }
    ]

});
const Task=mongoose.model('TASK',taskSchema);
module.exports=Task;