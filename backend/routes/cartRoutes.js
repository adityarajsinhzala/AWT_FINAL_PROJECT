import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
} from "../controllers/cartController.js";

const router = express.Router();
router.get("/", getCart);
router.put("/additem", addToCart);
router.delete("/remove", removeFromCart);

export default router;