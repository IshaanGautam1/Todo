import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
const getAllusers = async (req, res) => {
  const users = await User.find({});
  res.json({
    success: true,
    users,
  });
};

const register = async (req, res,next) => {
  try {
    const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(404).json({
      success: false,
      message: "User Already exists",
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userid = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    sendCookie(userid, res, "Registered Successsfully", 201);
  }
  } catch (error) {
    next(error)
  }
};

const getUserDetails = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.json({
    success: true,
    user,
  });
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });
  } else {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
      });
    } else {
      sendCookie(user, res, `Welcome back, ${user.name}`, 200);
    }
  }
  } catch (error) {
    next(error)
  }
};

const getMyProfile = (req, res) => {

  res.status(200).json({
    success: true,
    user:req.user,
  });
};

export const logout=(req,res)=>{
  res.status(200).cookie("token","",{expires:new Date(Date.now())}).json({
    success:true,
    user:req.user
  })
}

export { getAllusers, register, getUserDetails, login, getMyProfile};
