import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './database.js';

dotenv.config();

const app=express();
app.use(cors());

const port=process.env.PORT || 3000;
connectDB();

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})