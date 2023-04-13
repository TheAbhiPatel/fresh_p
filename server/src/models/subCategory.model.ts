import mongoose, { Document, Schema, model } from "mongoose";

export interface IBaseSubcat {
  userId: Schema.Types.ObjectId;
  menuId: Schema.Types.ObjectId;
  categoryId: Schema.Types.ObjectId;
  connectId: string;
  connectMenuId: string;
  connectCategoryId: string;
  name: string;
  label: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ISubcatSchema extends IBaseSubcat, Document {}

const subCatSchema = new Schema<IBaseSubcat>({
  userId: { type: Schema.Types.ObjectId },
  categoryId: { type: Schema.Types.ObjectId },
  menuId: { type: Schema.Types.ObjectId },
  connectId: { type: String },
  connectCategoryId: { type: String },
  connectMenuId: { type: String },
  name: { type: String },
  label: { type: String },
  value: { type: String },
  createdAt: { type: Date, default: Date.now, required: false },
  updatedAt: { type: Date, default: Date.now, required: false },
});

export const subCatModel = model<ISubcatSchema>("subcategory", subCatSchema);
