import cookieParser from "cookie-parser";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
