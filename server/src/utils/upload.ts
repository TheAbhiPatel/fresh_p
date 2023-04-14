import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, path.join(__dirname, "../../public/user/images"));
    } else if (
      file.mimetype === "video/mp4" ||
      file.mimetype === "video/mpeg"
    ) {
      cb(null, path.join(__dirname, "../../public/user/videos"));
    } else if (
      file.mimetype === "application/msword" ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, path.join(__dirname, "../../public/user/documents"));
    } else {
      cb(new Error("file format not supported,"), "./");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

/** ================          uploading files by field method */

// const fileFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: FileFilterCallback
// ): void => {
//   if (file.fieldname === "image") {
//     file.mimetype === "image/jpeg" || file.mimetype === "image/png"
//       ? cb(null, true)
//       : cb(
//           new Error(
//             "Image format not supported, It shuold be jpg, jpeg or png only"
//           )
//         );
//   } else if (file.fieldname === "video") {
//     file.mimetype === "video/mp4"
//       ? cb(null, true)
//       : cb(new Error("Video format not supported, It shuold be mp4 only"));
//   } else if (file.fieldname === "document") {
//     file.mimetype === "application/msword" ||
//     file.mimetype === "application/pdf"
//       ? cb(null, true)
//       : cb(
//           new Error(
//             "Document format not supported, It shuold be msdoc or pdf only"
//           )
//         );
//   }
// };
/** by fields method */
// export const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 1000000 * 10 },
// }).fields([{ name: "image" }, { name: "video" }, { name: "document" }]);

/** ================          uploading files by Array  method */

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (file.fieldname === "files") {
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/msword" ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/mpeg"
      ? cb(null, true)
      : cb(
          new Error(
            "File format not supported, It shuold be jpg, jpeg, png, mp4, mpeg, msword, pdf only"
          )
        );
  } else if (file.fieldname != "files") {
    cb(new Error("Field name is wrong, please selecet files"));
  }
};
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000 * 10 },
}).array("files", 8);
