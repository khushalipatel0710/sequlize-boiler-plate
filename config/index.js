const { config } = require("dotenv");
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

const CREDENTIALS = process.env.CREDENTIALS === "true";
const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  SECRET_KEY,
} = process.env;

module.exports = {
  CREDENTIALS,
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  SECRET_KEY,
};
