//imports
import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
//dotenv config

config({
  path: "./data/config.env",
});

//starting server
const app = express();
app.listen(4000, () => {
  console.log("server is running");
});

//middlewares
// app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST","PUT","DELETE"],
    credentials:true
  })
);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

//connecting to database
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backendapi",
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log("could not connect");
  });

//Creating Schema
// const schema = new mongoose.Schema({
//     name:String,
//     email: String,
//     password:String
// })

// const User = mongoose.model("User",schema)

//Router

const router = express.Router();

//get routes
app.get("/", (req, res) => {
  res.send("Home");
});

// app.get("/users/all",async (req,res)=>{

//     const users = await User.find({})
//     res.json({
//         success:true,
//         users
//     })
// })

//post Routes

// app.post("/users/new",async (req,res)=>{
//     const {name,email,password} = req.body;
//     const users = await User.create({
//         name,
//         email,
//         password
//     })
//     res.json({
//         success:true,
//         message:"Registered successfully"
//     })
// })

//using error middleware
app.use(errorMiddleware);
