import express from "express";
import { ConnectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/uploads", express.static(path.resolve("uploads")));

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await ConnectDB();

    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });

  } catch (err) {
    console.error("Server startup error:", err);
  }
};

startServer();