import dotenv from 'dotenv';
dotenv.config();


export const PORT=process.env.PORT;
export const MONGODB_URI=process.env.MONGODB_URI;
export const Admin_Password=process.env.Admin_Password;
export const REDIS_HOST=process.env.REDIS_HOST;
export const REDIS_PORT=process.env.REDIS_PORT;