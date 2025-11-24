import express from "express";
import {
  createSingleProduct,
  getAllProduct,
  getLatestProducts,
  getSingleProduct,
} from "../controllers/productController.js";
const router = express.Router();

// get all products
router.get("/", getAllProduct);

// get latest products
router.get('/latest', getLatestProducts)


// create single product
router.post("/", createSingleProduct);

// get single product
router.get("/:id", getSingleProduct);

export default router;
