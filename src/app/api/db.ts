import mysql from "serverless-mysql";

const db = mysql({
  config: {
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    host: `${process.env.DB_HOST}`,
    port: Number(process.env.DB_PORT),
    database: `${process.env.DB_NAME}`,
  },
});

export default db;
