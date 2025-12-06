import express, { Router } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";

//load env server
dotenv.config();

const app = express()
const PORT = process.env.PORT || 8000;

//Connect to Database
connectDB();
//CORS configuration 

//Increase body size limit for JSON and URL-encoded payloads
app.use(express.json());
//Routes
app.use("/api/auth",authRoutes);

//API Documention

//Home Route

app.get('/', (req, res) => {
  res.send('Hello from Baby Mart Server');
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  console.log(`Client URL: ${process.env.CLIENT_URL}`);
  console.log(`Admin URL:${process.env.ADMIN_URL}`);
  console.log(`API docs available at: http://localhost:${PORT}/api/docs`);
})
