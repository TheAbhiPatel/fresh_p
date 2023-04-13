import { Request, Response } from "express";
import { MulterError } from "multer";
import { upload } from "../utils/upload";
import { userFileModel } from "../models/userFiles.model";
import { APP_URL_FOR_PUBLIC_FILE } from "../config";

export const uploadFile = async (req: Request, res: Response) => {
  upload(req, res, async function (err) {
    if (err instanceof MulterError) {
      console.log("hey this is multer Error ...........", err);
      return res.status(400).json({ success: false, message: err.message });
    } else if (err) {
      console.log("hey this is Other Error ...........", err.message);
      return res.status(400).json({ success: false, message: err.message });
    }

    console.log(">>>>>>>>>>>> body >>>>>>>>>>>", req.body);
    console.log(">>>>>>>>>>>>> files >>>>>>>>>>", req.files);

    try {
      const userId = res.locals.user.id;

      const files = req.files as Express.Multer.File[];
      const { menuId, categoryId, subCategoryId } = req.body;

      if (files) {
        for (let i = 0; i < files.length; i++) {
          const img = new userFileModel({
            userId,
            menuId,
            categoryId,
            subCategoryId,
            fileName: files[i].filename,
            fileType: files[i].mimetype,
            filePath: files[i].path.split("public/")[1],
            sortOrder: i + 1,
          });
          await img.save();
        }
      }

      res.status(200).json({ success: true, message: "Files uploaded" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  });
};

export const getFiless = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id;
    const { subCategoryId } = req.body;
    const userFiles = await userFileModel.find({ userId, subCategoryId });
    if (userFiles.length == 0)
      return res.status(404).json({
        success: false,
        message: "File not found for this subCategory",
      });
    const fileUrls: any = [];

    for (let i = 0; i < userFiles.length; i++) {
      const filePath = userFiles[i].filePath;
      const url = `${APP_URL_FOR_PUBLIC_FILE}/${filePath}`;
      fileUrls.push(url);
    }

    res.status(200).json({ success: true, message: "File fetched", fileUrls });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
