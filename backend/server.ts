import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes/ToDoRoute";
import cors from "cors";
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors()); 
mongoose
  .connect(process.env.MONOG_URL as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
app.use(routes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
