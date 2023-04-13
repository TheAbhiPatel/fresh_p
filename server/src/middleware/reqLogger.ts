import { RequestHandler } from "express";
import fs from "fs";
import path from "path";
import requestModel from "../models/request.model";

const reqLogger: RequestHandler = async (req, res, next) => {
  try {
    const url = req.url;
    const method = req.method;
    const ip = req.ip;
    const userId = res.locals.user?.userId;

    res.on("finish", async () => {
      await requestModel.create({
        url,
        method,
        ip,
        userId,
        statusCode: res.statusCode,
      });
    });

    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

export default reqLogger;
