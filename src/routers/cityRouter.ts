import { Router } from "express";
import { cityName, user } from "../controllers/cityController";
import { authenticateToken } from '../middlewares/verifyJWT';

const router = Router();

router.get("/cityName", authenticateToken,cityName)
router.get("/user", authenticateToken,user)

export default router;