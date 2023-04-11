require('dotenv').config();
import express from "express";
import authRouter from './src/routers/authRouter';
import cityRouter from './src/routers/cityRouter';
import taskRouter from './src/routers/taskRouter';

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
