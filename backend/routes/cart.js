import express from "express";
import {
  getCart,
  updateQuantity,
  removeItem,
  addToCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/:userId", getCart);

router.post("/update", updateQuantity);

router.post("/remove", removeItem);

router.post("/add", addToCart);

export default router;
