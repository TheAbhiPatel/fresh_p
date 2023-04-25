import express from "express";
import { getFiles, uploadFile } from "../controllers/userFile.controller";

const router = express.Router();

router.get("/:id", getFiles);
router.post("/", uploadFile);

export default router;
