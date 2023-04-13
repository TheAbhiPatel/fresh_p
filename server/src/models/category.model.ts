import mongoose, { Document, Schema, model } from "mongoose";

export interface IBaseCat {
  userId: Schema.Types.ObjectId;
  menuId: Schema.Types.ObjectId;
  connectId: string;
  connectMenuId: string;
  name: string;
  label: string;
  value: string;
  selected: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICatSchema extends IBaseCat, Document {}

const catSchema = new Schema<ICatSchema>({
  userId: { type: Schema.Types.ObjectId },
  menuId: { type: Schema.Types.ObjectId },
  connectId: { type: String },
  connectMenuId: { type: String },
  name: { type: String },
  label: { type: String },
  value: { type: String },
  selected: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, required: false },
  updatedAt: { type: Date, default: Date.now, required: false },
});

export const catModel = model<ICatSchema>("category", catSchema);
