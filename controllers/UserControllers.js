import { User } from "../Models/User.js";
import bcrypt from "bcrypt";
import { SendToken } from "../Utils/SendToken.js";
import ErrorHandler from "../Middlewares/Error.js";

//Login
export const Login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if(!user) return next(new ErrorHandler("User does't Exsist",404));

  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) return next(new ErrorHandler("username or password is Incorrect!",404));
 
  SendToken(user, res, `Welcome Back ${user.name}`, 200);
};

//Refister
export const Register = async (req, res, next) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if(user) return next(new ErrorHandler("User Already Exsist!",404));
  
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  //token generate
  SendToken(user, res, `Registered Successfully ${user.name}`, 201);
};


//getmyProfile
export const Getmyprofile =(req, res, next) => {
  res.json({
    success: true,
    user:req.user,
  });
};


//Logout
export const Logout=(req,res,next)=>{
  const name=req.user.name;
res.status(200).cookie("token","",{expires:new Date(Date.now()),sameSite:process.env.NODE_URL==="Development"?"lax":"none",secure:process.env.NODE_URL==="Development"?false:true}).json({
  success:true,
  message:`Logout successfully ${name},Come Back soon!`,

})
}