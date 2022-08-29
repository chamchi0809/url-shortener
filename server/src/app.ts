import * as dotenv from 'dotenv'
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import { connectToServer } from './db/conn';
import recordRoutes from './routes/record';



const cors = require('cors');
const app = express();
const port  = process.env.PORT || 5000;
app.use(cors);
app.use(express.json());
app.use(recordRoutes);


app.listen(port,()=>{
  connectToServer((err)=>{
    if(err) console.error(err)
  })
  console.log(`listent to port :${port}`);
});