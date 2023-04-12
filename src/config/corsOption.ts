import cors, { CorsOptions, CorsOptionsDelegate } from "cors"

const whiteList = [
    'http://localhost:5000',
    'http://localhost:5001',
    'http://localhost:5002'
]
  
export const corsOptions: CorsOptions | CorsOptionsDelegate = {
    origin: (origin, callback) => {
      if (!origin || whiteList?.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    optionsSuccessStatus: 200,
};