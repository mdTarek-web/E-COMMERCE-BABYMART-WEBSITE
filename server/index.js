import express, { Router } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";

//load env server
dotenv.config();

const app = express()
const PORT = process.env.PORT || 8000;

//Connect to Database
connectDB();
//CORS configuration 
const allowedOrigins = [process.env.ADMIN_URL].filter(Boolean);//Remove any undefined valued

app.use(cors({
  origin: function(origin, callback){
    //Allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);

    //In development, allow all origins for easier testing
    if(process.env.NODE_ENV === "development"){
      return callback(null, true);
    }
    //Production cases
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

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
