require('dotenv').config();
import express from "express";
import authRouter from './src/routers/authRouter';
import cityRouter from './src/routers/cityRouter';
import taskRouter from './src/routers/taskRouter';
import { corsOptions } from './src/config/corsOption';
import cors from "cors";
import awsServerlessExpress from 'aws-serverless-express';

// Create an instance of the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Add CORS middleware
app.use(cors(corsOptions));

// Add JSON body parser middleware
app.use(express.json());

// Add your routers
app.use('/api/auth', authRouter);
app.use('/api/city', cityRouter);
app.use('/api/task', taskRouter);

// Create a Lambda handler function
const server = awsServerlessExpress.createServer(app);

// Define the Lambda function handler
export const handler = (event: any, context: any) => {
  awsServerlessExpress.proxy(server, event, context);
};

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});