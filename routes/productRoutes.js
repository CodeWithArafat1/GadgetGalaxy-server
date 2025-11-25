import express from "express";
import {
  createSingleProduct,
  deleteSingleProduct,
  getAllProduct,
  getLatestProducts,
  getMyProduct,
  getSingleProduct,
} from "../controllers/productController.js";
const router = express.Router();

// get all products
router.get("/", getAllProduct);

// get my product
router.get('/myProducts', getMyProduct)

// get latest products
router.get("/latest", getLatestProducts);

// create single product
router.post("/", createSingleProduct);

// get single product
router.get("/:id", getSingleProduct);

// delete single product
router.delete("/:id", deleteSingleProduct);


export default router;
