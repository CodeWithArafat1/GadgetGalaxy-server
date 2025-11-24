import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import { connectDB } from "./config/db.js";
import router from "./routes/productRoutes.js";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  
  res.json({ message: "Server is running...." });
});

// app router
app.use("/api/products", router);

// connect to DB
const main = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log("server is running...", port);
    });
  } catch (err) {
    console.error(err.message);
  }
};

main();
