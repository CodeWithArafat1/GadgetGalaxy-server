import express from "express";
import {
  createCartProduct,
  createSingleProduct,
  deleteSingleCart,
  deleteSingleProduct,
  getAllProduct,
  getCartProducts,
  getLatestProducts,
  getMyProduct,
  getSingleProduct,
} from "../controllers/productController.js";
const router = express.Router();

// get all products
router.get("/", getAllProduct);

// get my product
router.get("/myProducts", getMyProduct);

// get all cart products
router.get("/myCart", getCartProducts);

// create cart product
router.post("/myCart", createCartProduct);

// delete single cart product
router.delete('/myCart/:id', deleteSingleCart)

// get latest products
router.get("/latest", getLatestProducts);

// create single product
router.post("/", createSingleProduct);

// get single product
router.get("/:id", getSingleProduct);

// delete single product
router.delete("/:id", deleteSingleProduct);

export default router;
