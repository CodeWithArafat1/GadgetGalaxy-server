import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

// get all products
export const getAllProduct = async (req, res) => {
  try {
    /** @type {import("mongodb").Db} */
    const db = getDB();

    const products = await db.collection("products").find().toArray();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", err });
  }
};

// find by email
export const getMyProduct = async (req, res) => {
  try {
    const db = getDB();
    const { email } = req.query;
    const data = await db.collection("products").find({ email }).toArray();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "failed to fetching product", err });
  }
};

// cart products
export const getCartProducts = async (req, res) => {
  try {
    const db = getDB();
    const { email } = req.query;
    const data = await db.collection("myCart").find({ email }).toArray();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "failed to fetching cart products" });
  }
};
// add to cart
export const createCartProduct = async (req, res) => {
  try {
    const db = getDB();
    const { productId, quantity, name, price, image, email } = req.body;

    const existing = await db
      .collection("myCart")
      .findOne({ productId, email });

    if (existing) {
      await db
        .collection("myCart")
        .updateOne(
          { _id: existing._id },
          { $inc: { quantity: quantity || 1 } }
        );
      return res.status(200).json({ message: "Quantity updated" });
    }

    const data = await db.collection("myCart").insertOne({
      productId,
      email,
      name,
      price,
      image,
      quantity: quantity || 1,
    });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: "failed to creating cart data" });
  }
};

// delete single cart

export const deleteSingleCart = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const data = await db.collection("myCart").deleteOne(query);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "failed to delete carat data" });
  }
};

// get latest 8 products
export const getLatestProducts = async (req, res) => {
  try {
    const db = getDB();
    const data = await db
      .collection("products")
      .find()
      .sort({ _id: -1 })
      .limit(8)
      .toArray();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", err });
  }
};

// create single product
export const createSingleProduct = async (req, res) => {
  try {
    const db = getDB();
    const product = req.body;
    const data = await db.collection("products").insertOne(product);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error Creating product", err });
  }
};

// get single product
export const getSingleProduct = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const data = await db.collection("products").findOne(query);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error Product fetching...", err });
  }
};

// delete single product
export const deleteSingleProduct = async (req, res) => {
  try {
    /** @type {import("mongodb").Db} */
    const db = getDB();
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const data = await db.collection("products").deleteOne(query);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error product deletion", err });
  }
};
