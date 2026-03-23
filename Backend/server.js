import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary"
import connectDB from "./connection/mongo.js";
import Routes from "./routes/route.js";

dotenv.config();

cloudinary.config({
  cloud_name:process.env.cloudinary_cloud_name,
  api_key:process.env.cloudinary_api_key,
  api_secret:process.env.cloudinary_api_secret
});



const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// console.log(process.env.FrontendUrl);
app.use(
  cors({
    origin: process.env.FrontendUrl,
    credentials: true
  })
);

app.use("/uploads", express.static("uploads"));

// DB
connectDB();

// routes
app.use("/", Routes);

// server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
