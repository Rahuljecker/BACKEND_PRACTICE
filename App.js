import express from "express";
import userRouter from "./Routes/UserRoutes.js";
import cookieParser from "cookie-parser";
import taskRouter from "./Routes/taskRoutes.js";
import bodyParser from "body-parser";
import { errorMiddleWare } from "./Middlewares/Error.js";
import cors from "cors";

const App = express();

//middleware
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(cookieParser());
App.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true,
  })
);
// App.use(bodyParser.json())
// App.use(bodyParser.urlencoded({extended:true}))

//using routes
App.use("/api/v1", userRouter);
App.use("/api/v1", taskRouter);

//using error middleware
App.use(errorMiddleWare);

export default App;
