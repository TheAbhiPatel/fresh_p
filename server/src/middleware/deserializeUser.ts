import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const deserilizeUser: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (!token) return next();
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) return next();

    res.locals.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

export default deserilizeUser;
