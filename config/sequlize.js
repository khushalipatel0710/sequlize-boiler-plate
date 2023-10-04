const Sequelize = require("sequelize");
const {
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} = require("./index");
const logger = require("../lib/logger");

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: "mysql",
  host: DB_HOST,
  port: DB_PORT,

  // timezone: '+09:00',
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    underscored: true,
    freezeTableName: true,
    logging: false,
    timestamps: true,
    query: { raw: true },
  },
  pool: {
    min: 0,
    max: 5,
  },

  logQueryParameters: NODE_ENV === "development",
  logging: (query, time) => {
    logger.info(time + "ms");
  },
  benchmark: true,
});
sequelize.sync({ alter: false });
async function connect() {
  try {
    console.log("connecting...");
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
connect();
