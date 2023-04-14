import { ErrorRequestHandler } from "express";
import errorModel from "../models/error.model";

const errorLogger: ErrorRequestHandler = async (err, req, res, next) => {
  try {
    const userId = res.locals?.user?.id;
    const reqMethod = req.method;
    const reqPath = req.path;
    const errorName = err.name;
    const errorMessage = err.message;

    const newError = await errorModel.create({
      userId,
      reqMethod,
      reqPath,
      errorName,
      errorMessage,
    });
    res.status(500).json({
      success: false,
      errorName: err.name,
      errorMessage: err.message,
    });
    console.log("--||----||------>>>", err);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong from errorLogger",
    });
  }
};

export default errorLogger;
