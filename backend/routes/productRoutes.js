import express from "express";
import {
  getProduct,
  getProductById,
  createProduct,
  createProductBulk,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();
router.get("/", getProduct);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.post("/bulk", createProductBulk);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;