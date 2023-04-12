import cors, { CorsOptions, CorsOptionsDelegate } from "cors"
import { whiteList } from "./allowedOrigins";
  
export const corsOptions: CorsOptions | CorsOptionsDelegate = {
    origin: (origin, callback) => {
      if (!origin || whiteList?.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    optionsSuccessStatus: 200,
};