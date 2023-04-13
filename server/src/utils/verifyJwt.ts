import jwt from "jsonwebtoken";

export const verifyJwt = <T>(token: any, secretKey: string): T | null => {
  try {
    return jwt.verify(token, secretKey) as T;
  } catch (error) {
    return null;
  }
};
