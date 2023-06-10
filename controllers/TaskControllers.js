import ErrorHandler, { errorMiddleWare } from "../Middlewares/Error.js";
import { Task } from "../Models/Task.js";

export const CreateTask = async (req, res, next) => {
  const { Title, description } = req.body;
  if (!Title && !description) {
    res.status(404).json({
      success: false,
      message: "please provide all fields",
    });
  }
  const newtask = await Task.create({
    Title,
    description,
    user: req.user,
  });
  res.status(201).json({
    success: true,
    message: `Task created Successfully ${req.user.name}`,
  });
};

export const GetAllTasks = async (req, res, next) => {
  const userid = req.user._id;
  const alltask = await Task.find({ user: userid });
  res.status(201).json({
    success: true,
    alltask,
    message: `Here are your all tasks that you have created ${req.user.name}`,
  });
};

export const IsUpdatedTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if(!task) return next(new ErrorHandler("Task Not found",404)) 

  task.IsCompleted=!task.IsCompleted; 
  console.log(task.IsCompleted);
  await task.save();
  console.log(task.IsCompleted);
  res.status(201).json({
    success: true,
    message: "Your task has been updated",
  });
};

export const isDeletedTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if(!task) return next(new ErrorHandler("Task not Found",404));

  await task.deleteOne(); 
  res.status(201).json({
    success: true,
    message: "You have completed the task and now it is deleted Successfully",
  });
};
