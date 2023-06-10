import App from "./App.js";
import  {config} from "dotenv";
import { connectDb } from "./config/Database.js";

config({path:"./config/config.env"})


//Databse connected
connectDb();


App.get("/",(req,res,next)=>{
    res.send("Hiii I am from server side");
})

App.listen(process.env.PORT,(req,res)=>{
console.log(`Server is Working on ${process.env.PORT}`)
})