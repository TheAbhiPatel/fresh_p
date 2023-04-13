import express from "express";
import { getMe } from "../controllers/user.controller";
import requireUser from "../middleware/requireUser";
import validateToken from "../utils/validateToken";
import authRoutes from "./authRoutes";
import menuRoutes from "./menuRoutes";
import userFileRoutes from "./userFileRoutes";

const router = express.Router();

router.use("/get-me/:id", getMe);
router.use("/auth", authRoutes);
router.use("/validate-token", validateToken);
router.use("/menu", requireUser, menuRoutes);
router.use("/file", requireUser, userFileRoutes);

export default router;
