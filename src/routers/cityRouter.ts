import { Router } from "express";
import { cityName, user } from "../controllers/cityController";

const router = Router();

router.get("/cityName", cityName)
router.get("/user", user)

export default router;