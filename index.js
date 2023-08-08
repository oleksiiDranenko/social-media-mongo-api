// libraries
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
// routes
import { userRouter } from './routes/user.js';
import { postsRouter } from './routes/posts.js';


const app = express()

app.use(cors())
app.use(express.json())

app.use('/user', userRouter)
app.use('/posts', postsRouter)


// taking variable from .env file
dotenv.config()
const dbConnectionString = process.env.DB_CONNECTION_STRING;

mongoose.connect(dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


app.listen(3001, () => {
  console.log('Server is running on port 3001');
})