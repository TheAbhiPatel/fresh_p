import "dotenv/config";

export const PORT = process.env.PORT;

export const HOST_NAME = process.env.HOST_NAME;

export const MONGO_URL = process.env.MONGO_URL!;

export const APP_URL_FOR_PUBLIC_FILE = process.env.APP_URL_FOR_PUBLIC_FILE!;

export const JWT_SECRET = process.env.JWT_SECRET!;

export const SEND_EMAIL_USER = process.env.SEND_EMAIL_USER;
export const SEND_EMAIL_PASS = process.env.SEND_EMAIL_PASS;
export const SEND_EMAIL_JWT_SECRET = process.env.SEND_EMAIL_JWT_SECRET!;

export const FRONTEND_URL = process.env.FRONTEND_URL!;

// =================================================
