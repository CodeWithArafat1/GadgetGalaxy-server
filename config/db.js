import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

export const connectDB = async () => {
  try {
    // await client.connect();
    db = client.db("gadgetGalaxyDB");
    // console.log("✅ MongoDB Connected Successfully!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};


export const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
};
