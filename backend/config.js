import dotenv from 'dotenv';

// dotenv.config({path: './config.env'})
dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  DATABASE: process.env.DATABASE,
};