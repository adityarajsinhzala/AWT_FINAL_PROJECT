import express from "express"
import { ConnectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import cors from "cors"
import path from "path";

const app = express();

app.use("/uploads", express.static(path.resolve("uploads")));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }))
app.use(express.json());

ConnectDB();


app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});