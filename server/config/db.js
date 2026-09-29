import mongoose from "mongoose";

export async function connectDB() {
  const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (
    !mongoURI ||
    mongoURI.includes("<password>") ||
    mongoURI.includes("your_mongodb_atlas_connection_string")
  ) {
    console.warn(`
  ⚠️  ==============================================================
  🍃 MONGODB ATLAS NOT CONFIGURED YET!
  Please add your MongoDB Atlas connection string in 'server/.env':
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/moonschool?retryWrites=true&w=majority
  ==============================================================
    `);
    return null;
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(
      `🍃 Connected to MongoDB: ${conn.connection.host} (Database: ${conn.connection.name})`,
    );

    return conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    console.error(
      "👉 Please check your MONGODB_URI in server/.env, verify IP whitelist in Atlas (allow 0.0.0.0/0 or your current IP), and check credentials.",
    );
    return null;
  }
}

// Backwards-compatible alias for index.js
export const initDatabase = connectDB;
