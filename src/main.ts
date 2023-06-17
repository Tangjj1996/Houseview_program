import "dotenv/config";
import express from "express";
import chalk from "chalk";
import dayjs from "dayjs";
import cors from "cors";
import config from "./config.js";
import routes from "./route.js";

const app = express();

/**
 * Use cors middleware
 */
app.use(cors());

/**
 * Format url-endcode
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Format json
 */
app.use(express.json());

/**
 * Static assets middleware
 */
app.use("/static", express.static("src/assets"));

/**
 * Global route
 */
app.use("/", routes);

app.listen(config.PORT, () => {
  console.log(
    chalk.green(
      "✅",
      `Running success on port ${chalk.green.bold(config.PORT)}`,
      dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    )
  );
});
