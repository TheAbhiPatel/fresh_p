import mongoose, { Document, Schema, model } from "mongoose";

export interface IBaseError {
  userId: Schema.Types.ObjectId;
  reqMethod: string;
  reqPath: string;
  errorName: string;
  errorMessage: string;
  date: Date;
}

export interface IErrorSchema extends IBaseError, Document {}

const errorSchema = new Schema<IErrorSchema>({
  userId: { type: Schema.Types.ObjectId },
  reqMethod: { type: String },
  reqPath: { type: String },
  errorName: { type: String },
  errorMessage: { type: String },
  date: { type: Date, default: Date.now, required: false },
});

export default model<IErrorSchema>("ErrorLogs", errorSchema);
