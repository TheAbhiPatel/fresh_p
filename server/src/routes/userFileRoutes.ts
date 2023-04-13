import express from "express";
import { getFiless, uploadFile } from "../controllers/userFile.controller";

const router = express.Router();

router.get("/", getFiless);
router.post("/", uploadFile);

export default router;
