require('dotenv').config();
import express from "express";
import authRouter from './src/routers/authRouter';
import cityRouter from './src/routers/cityRouter';
import taskRouter from './src/routers/taskRouter';
import { corsOptions } from './src/config/corsOption';
import cors from "cors";


//create app instance
const app = express();
const PORT = process.env.PORT || 3000

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth',authRouter );
app.use('/api/city',cityRouter );
app.use('/api/task',taskRouter );

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
