const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const helperSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    state:{
        type:String,
        required:true
        },
        city:{
        type:String,
        required:true
        },

        profpic:{
            type:String,
            required:true
            
            },
            gender:{
                type:String,
                required:true

            },
            age:{
                type:String,
                required:true
             
            },
         skills: [{
        type: String,
        required:true
    }],

        password:{
                type:String,
                required:true
            },
        cpassword:{
                type:String,
                required:true
            },
        tokens:[
                {
                  token:{
                   type:String,
                   required:true
                  }
            
                }
        ]


})

helperSchema.pre("save",async function(next){
    
    if(this.isModified("password")){
    this.password=await bcrypt.hash(this.password,5);
    this.cpassword=await bcrypt.hash(this.cpassword,5);
    }
    next();
    
    });
    helperSchema.methods.generateAuthToken=async function (){
        try{
        let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
        }
        catch(err){
        
        console.log(err);
        
        }
        
        }
    const Helper=mongoose.model('HELPER',helperSchema);
module.exports=Helper;