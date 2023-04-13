import express from "express";
import {
  loginUser,
  resendVericationEmail,
  resetPassword,
  sendForgetPassEmail,
  signupUser,
  verifyEmail,
} from "../controllers/authController";
import validate from "../middleware/validate";
import {
  loginUserSchema,
  resendVericationEmailSchema,
  resetPasswordSchema,
  sendForgetPassEmailSchema,
  signupUserSchema,
  verifyEmailSchema,
} from "../validation/authSchema";

const authRouter = express.Router();

authRouter.post("/signup", validate(signupUserSchema), signupUser);

authRouter.post("/login", validate(loginUserSchema), loginUser);

authRouter.post(
  "/resend-verification-email",
  validate(resendVericationEmailSchema),
  resendVericationEmail
);

authRouter.post("/verify-email", validate(verifyEmailSchema), verifyEmail);

authRouter.post(
  "/forget-password-email",
  validate(sendForgetPassEmailSchema),
  sendForgetPassEmail
);

authRouter.post(
  "/reset-password",
  validate(resetPasswordSchema),
  resetPassword
);

export default authRouter;
