import mongoose, { Document, Schema, model } from "mongoose";

export interface IRequest extends Document {
  userId: string;
  url: string;
  method: string;
  ip: string;
  date: Date;
  statusCode: number;
}

const reqeustSchema = new Schema({
  userId: { type: String },
  url: { type: String },
  method: { type: String },
  ip: { type: String },
  date: { type: Date, default: Date.now, required: false },
  statusCode: { type: Number },
});

export default model<IRequest>("RequestLogs", reqeustSchema);
