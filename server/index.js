import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";

import authRoutes from "./routers/auth.js";

dotenv.config();
const app = express();

// Connection to DB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("err", err);
    process.exit(1);
  });

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Routes Middlewares
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
