import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dataRouter from "./routes/data";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*", // Temporarily allow all origins for debugging
  })
);
app.use(express.json());

// 🛑 Moved logging middleware here BEFORE the routes
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.originalUrl}`
  );
  next();
});

// Your routes after logging
app.use("/", dataRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
