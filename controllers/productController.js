import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

// get all products
export const getAllProduct = async (req, res) => {
  try {
    const db = getDB();
    const products = await db.collection("products").find().toArray();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", err });
  }
};

// get latest 8 products
export const getLatestProducts = async (req,res) => {
  try {
    const db = getDB();
    const data = await db.collection("products").find().sort({_id: -1}).limit(8).toArray();
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
    /** @type {import("mongodb").Db} */
    const db = getDB();
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const data = await db.collection("products").findOne(query);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error Product fetching...", err });
  }
};
