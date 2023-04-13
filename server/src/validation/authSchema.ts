import zod, { object, string, TypeOf } from "zod";

export const signupUserSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }),
    email: string({ required_error: "Email is required" }).email(
      "Email is not valid"
    ),
    password: string({ required_error: "Password is required" })
      .min(6, "Password must be 6 character long")
      .max(16, "Password must be  under 16 character"),
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }).email(
      "Email is not valid"
    ),
    password: string({ required_error: "Password is required" }),
  }),
});
export const resendVericationEmailSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }).email(
      "Email is not valid"
    ),
  }),
});

export const verifyEmailSchema = object({
  query: object({
    token: string({ required_error: "Token is required" }),
  }),
});

export const sendForgetPassEmailSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }).email(
      "Email is not valid"
    ),
  }),
});

export const resetPasswordSchema = object({
  body: object({
    password: string({ required_error: "Password is required" })
      .min(6, "Password must be 6 character long")
      .max(16, "Password must be  under 16 character"),
  }),
  query: object({
    token: string({ required_error: "Token is required" }),
  }),
});

export type signupUserInput = TypeOf<typeof signupUserSchema>["body"];
export type loginUserInput = TypeOf<typeof loginUserSchema>["body"];
