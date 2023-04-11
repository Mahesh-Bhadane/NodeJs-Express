import { Request,Response } from "express";
require('dotenv').config();
import express from "express";
import { connection } from "./database";
import authRouter from './Router/authRouter';
import cityRouter from './Router/cityRouter';
import taskRouter from './Router/taskRouter';

//create app instance
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use('/api/auth',authRouter );
app.use('/api/city',cityRouter );
app.use('/api/task',taskRouter );

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
