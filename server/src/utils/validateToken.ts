import { Request, Response } from "express";
import { JWT_SECRET } from "../config";
import userModel from "../models/userModel";
import { verifyJwt } from "./verifyJwt";

const validateToken = async (req: Request, res: Response) => {
  const token = req.query.token;
  try {
    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token not found" });
    const isValidate = verifyJwt<{ id: string }>(token, JWT_SECRET);
    if (!isValidate)
      return res
        .status(401)
        .json({ success: false, message: "Token is invalid or Expired" });
    const user = await userModel.findById(isValidate.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User does not exists" });
    res
      .status(200)
      .json({ success: true, message: "Token validate successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export default validateToken;
