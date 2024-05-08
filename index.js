import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv"; // Import dotenv module here
import jawabanKognitif from "./routes/jawabankognitif-routes.js";
import jawabanSpritual from "./routes/jawabanspritual-routes.js";
import jawabanPpl from "./routes/jawabanppl-routes.js";
import komentar from "./routes/komentar-router.js";
import userRoutes from "./routes/user-routes.js";

dotenv.config(); // Call dotenv.config() here

const PORT = process.env.PORT || 5000;
const app = express();
const MONGODB_URL = process.env.MONGODB_URL;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/", userRoutes);
app.use("/api/v1/", jawabanPpl);
app.use("/api/v1/", jawabanKognitif);
app.use("/api/v1/", jawabanSpritual);
app.use("/api/v1/", komentar);

mongoose
  .connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Connected to Database Localhost ${PORT}`)
    )
  )
  .catch((err) => console.log(err));
