import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./src/middleware/error.middleware.js";
import connectDB from "./src/dbconfig/mongoDb.js";
import userRoutes from "./src/routes/user.route.js";
import tripRouter from "./src/routes/trip.route.js";

const app = express();
app.use(cookieParser());

const allowedOrigin = [
  "http://localhost:3000",
  "https://ai-travel-planner-frontend-production.up.railway.app",
];

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  }),
);

app.use(express.json());

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

app.use("/", userRoutes);
app.use("/", tripRouter);
app.use(errorMiddleware);
startServer();
