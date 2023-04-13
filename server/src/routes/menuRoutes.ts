import express from "express";
import {
  deleteMenu,
  getAllMenus,
  getMenu,
  postMenu,
  updateMenu,
} from "../controllers/menu.controller";

const router = express.Router();

router.post("/", postMenu);
router.get("/", getAllMenus);
router.get("/:id", getMenu);
router.patch("/", updateMenu);
router.delete("/:id", deleteMenu);

export default router;
