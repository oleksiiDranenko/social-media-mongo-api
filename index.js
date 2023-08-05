import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express()

app.use(cors())
app.use(express.json())


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