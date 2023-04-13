import mongoose, { Document, Schema, model, Model } from "mongoose";

export interface IBaseMenu {
  userId: Schema.Types.ObjectId;
  connectId: string;
  name: string;
  label: string;
  value: string;
  password: string;
  isProtected: boolean;
  selected: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMenuSchema extends IBaseMenu, Document {}
export type IInstanceMethods = object;
export type IMenuModel = Model<IMenuSchema, object, IInstanceMethods>;

const menuSchema = new Schema<IMenuSchema, IMenuModel, IInstanceMethods>({
  userId: { type: Schema.Types.ObjectId, required: true },
  connectId: { type: String },
  name: { type: String, required: true },
  label: { type: String, required: true },
  value: { type: String, required: true },
  password: { type: String },
  isProtected: { type: Boolean, default: false },
  selected: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, required: false },
  updatedAt: { type: Date, default: Date.now, required: false },
});

export const menuModel: IMenuModel = model<IMenuSchema, IMenuModel>(
  "menu",
  menuSchema
);
