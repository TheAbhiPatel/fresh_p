import mongoose, { Document, Schema, model } from "mongoose";

export interface IBaseUserFile {
  userId: Schema.Types.ObjectId;
  menuId: Schema.Types.ObjectId;
  categoryId: Schema.Types.ObjectId;
  subCategoryId: Schema.Types.ObjectId;
  fileName: string;
  fileType: string;
  sortOrder: number;
  filePath: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUserFileSchema extends IBaseUserFile, Document {}

const userFileSchema = new Schema<IUserFileSchema>({
  userId: { type: Schema.Types.ObjectId },
  menuId: { type: Schema.Types.ObjectId },
  categoryId: { type: Schema.Types.ObjectId },
  subCategoryId: { type: Schema.Types.ObjectId },
  fileName: { type: String },
  fileType: { type: String },
  sortOrder: { type: Number },
  filePath: { type: String },
  createdAt: { type: Date, default: Date.now, required: false },
  updatedAt: { type: Date, default: Date.now, required: false },
});

export const userFileModel = model<IUserFileSchema>("userFile", userFileSchema);
