import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {userRouter}  from './router/userRouter.js';
import { connectDB } from './db/db.js';
import { postRouter } from './router/postRouter.js';

const app = express();
dotenv.config({
    path:'./config.env'
});

// DATABASE CONNECTION
connectDB();

const PORT = parseInt(process.env.PORT) || 5000; 

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true,}))
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use('/api/user', userRouter)
app.use('/api/post',postRouter)


app.listen(PORT, () => {
    try {
        
  console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.log(error)
    }
});

