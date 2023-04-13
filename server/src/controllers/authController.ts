import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import { JWT_SECRET, SEND_EMAIL_JWT_SECRET } from "../config";
import sendEMail from "../utils/sendEMail";
import { verifyJwt } from "../utils/verifyJwt";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find({}, { password: 0 });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const signupUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user)
      return res
        .status(403)
        .json({ success: false, message: "User already registered" });

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashPass,
    });
    const userId = { userId: newUser.id };
    const token = jwt.sign(userId, SEND_EMAIL_JWT_SECRET, {
      expiresIn: "15m",
    });

    const PreviewUrl = await sendEMail(name, email, token, true);

    res.status(201).json({
      success: true,
      message: "User registered successfully, Please verify your Email",
      verificationURL: PreviewUrl,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Please signup first then try" });
    if (user.isVerified == false)
      return res
        .status(403)
        .json({ success: false, message: "Please verify your email first" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password" });

    const userData = { name: user.name, email: user.email, id: user.id };
    const token = jwt.sign(userData, JWT_SECRET, {
      expiresIn: "5d",
    });
    // const refreshToken = await genRefreshToken(userData);
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const resendVericationEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Please signup first then try" });
    if (user.isVerified === true)
      return res
        .status(403)
        .json({ success: false, message: "You are already verified" });
    const userId = { userId: user.id };
    const token = jwt.sign(userId, SEND_EMAIL_JWT_SECRET, {
      expiresIn: "15m",
    });

    const PreviewUrl = await sendEMail(user.name, email, token, true);
    res
      .status(200)
      .json({ success: true, message: "Verification email sent", PreviewUrl });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query;

  try {
    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "No token found" });

    const decoded = verifyJwt<{ userId: string }>(token, SEND_EMAIL_JWT_SECRET);
    if (!decoded)
      return res.status(403).json({ success: false, message: "Invalid token" });

    const user = await userModel.findById(decoded.userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Please signup first then try" });

    if (user.isVerified)
      return res
        .status(403)
        .json({ success: false, message: "You are already verified" });

    user.isVerified = true;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
export const sendForgetPassEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Please signup first then try" });
    if (!user.isVerified)
      return res.status(403).json({
        success: false,
        message: "Please verify your Email first then try again",
      });
    const token = jwt.sign({ userId: user.id }, SEND_EMAIL_JWT_SECRET, {
      expiresIn: "15m",
    });

    const PreviewUrl = await sendEMail(user.name, user.email, token, false);

    res.status(200).json({
      success: true,
      message: "Forget password email sent",
      PreviewUrl,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  const { token } = req.query;

  try {
    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required" });
    const decoded = verifyJwt<{ userId: string }>(token, SEND_EMAIL_JWT_SECRET);
    if (!decoded)
      return res.status(403).json({ success: false, message: "Invalid token" });
    const user = await userModel.findById(decoded.userId);
    if (!user)
      return res.status(404).json({
        success: false,
        message: "Please signup first then try again",
      });

    const hashPass = await bcrypt.hash(password, 10);

    user.password = hashPass;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// ================================================
export const newFunc = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
