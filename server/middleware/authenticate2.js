const jwt=require("jsonwebtoken");
const User=require("../model/userSchema");
const Helper=require("../model/helperSchema");
const Authenticate=async(req,res,next)=>{
try{
const token=req.cookies.jwtoken;

const verifytoken=jwt.verify(token,process.env.SECRET_KEY);



const rootUser2=await Helper.findOne({_id:verifytoken._id,"tokens.token":token});
if(!rootUser2){
    throw new Error("User not found");

}


    req.rootUser = rootUser2;
    req.userID = rootUser2._id;

req.token=token;


next();
}
catch(err){
res.status(401).send("Unauthorized:No token provided");
console.log(err);
}
}
module.exports=Authenticate;