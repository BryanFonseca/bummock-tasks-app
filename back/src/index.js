import "dotenv/config";
import express from "express";
import cors from "cors";

import tasks from './routes/tasks.js';
import errorHandler from "./middlewares/error-handler.js";

import './db/sequelize.js';
import './db/seed.js';

const app = express();

app.use(express.json());

// Routing
app.use(tasks);

app.use(errorHandler);

// Allow all origins
app.use(cors({ origin: "*" }));

app.listen(process.env.PORT, () => {
    console.log("Listening on port", process.env.PORT);
});
