import express from "express";
import {
  Register,
  Login,
  Getmyprofile,
  Logout,
} from "../controllers/UserControllers.js";
import {isAuthenticated} from "../Middlewares/Auth.js"

const router = express.Router();

//api for crate a new user
router.post("/register", Register);
router.post("/login", Login);

//logout
router.get("/logout",isAuthenticated, Logout);

//Api for get for a specific ID (Dynamic Route)
router.get("/getmyprofile",isAuthenticated, Getmyprofile);

export default router;
