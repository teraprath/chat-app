import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import contactRoutes from "./routes/contact.route.js";
import { connect } from "./lib/db.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  connect();
});
