import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import urlSchema from "./src/models/shorturlmodel.js"
import short_url from "./src/routes/short_url.routes.js";
import userRoutes from "./src/routes/user.route.js";
import authRoutes from "./src/routes/auth.route.js";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorhandler.js";
import cors from "cors";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser";
dotenv.config({ path: "./.env" });

const app = express();
app.use(cors(
  {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,  
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);
// Connect to database
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/create", short_url);
app.use("/api/user", userRoutes);

app.get("/:id", redirectFromShortUrl)

// Handle favicon requests
// app.get('/favicon.ico', (req, res) => res.status(204).end());

// // 404 handler
// app.use((req, res, next) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found"
//   });
// });

app.use(errorHandler)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


