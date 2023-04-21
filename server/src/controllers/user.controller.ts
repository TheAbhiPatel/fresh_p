import { RequestHandler } from "express";
import userModel from "../models/userModel";

// /**
//  * @openapi
//  * /api/get-me:
//  *  get:
//  *     tags:
//  *     - getMe
//  *     description: Responds if the app is up and running
//  *     responses:
//  *       200:
//  *         description: App is up and running
//  */

export const getMe: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const me = await userModel.findById(id).select("name email");
    // .select("-password -__v -isVerified -createdAt -updatedAt");
    if (!me)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.status(200).json(me);
  } catch (error) {
    return next(error);
  }
};
