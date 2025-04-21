import express from "express";
import dotenv from "dotenv";
// import cors from "cors";
import testRouter from "./routes/test";

dotenv.config();

const app = express();
// app.use(cors());
app.use(express.json());
app.use("/test", testRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
