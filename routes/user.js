import express from "express";
import { User } from "../models/user.js";
import { getAllusers, getUserDetails, register,login, getMyProfile, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.get("/users/all", getAllusers);

router.post("/new",register)
router.post("/login",login)
router.get("/logout",logout)
// router.route("userid/:id").get(getUserDetails);
router.get("/me",isAuthenticated,getMyProfile)
export default router;