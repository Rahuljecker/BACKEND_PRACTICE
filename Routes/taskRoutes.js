import express from "express"
import { CreateTask, GetAllTasks, IsUpdatedTask, isDeletedTask } from "../controllers/TaskControllers.js";
import { isAuthenticated } from "../Middlewares/Auth.js";

const router=express.Router();
router.post("/createtask",isAuthenticated,CreateTask);
router.get("/getalltasks",isAuthenticated,GetAllTasks);
router.route("/:id").put(isAuthenticated,IsUpdatedTask).delete(isAuthenticated,isDeletedTask);
export default router;
