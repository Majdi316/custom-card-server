//TODO Libraries
import express from "express";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
import chalk from "chalk";
import cors from "cors";
import router from "./routers/router.js";
import morgan from "morgan";
import { rateLimit } from 'express-rate-limit'
//TODO Functions
import logger from "./middlewares/logger.js";
import { connectToDb } from "./DB/dbService.js";


// App Config
const app = express();
const port = process.env.PORT || 8080;
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 100, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
  message:"429- Too Many Request Try Again Later"
})
// middlewares
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(limiter)
//api router
app.use(router);


app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send("Server Internal Error");
});


//TODO Run the server
app.listen(port, () => {
  console.log(chalk.blueBright("Server started at PORT: " + port));
  connectToDb();
});
