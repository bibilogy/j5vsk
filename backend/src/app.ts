import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dataRouter from "./routes/data";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/v4", dataRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
