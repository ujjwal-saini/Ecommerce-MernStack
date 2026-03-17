import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./connection/mongo.js";
import Routes from "./routes/route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://ecommerce-mernstack-frontend.onrender.com",
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
