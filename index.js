import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

/* ROUTES IMPORTS */
import chatRoutes from "./routes/chatRoutes.js";

/* CONFIG IMPORTS */
import "./config/redisClient.js";

/* CONFIG */
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

/* ROUTES */
app.get("/", (req, res) => {
  res.json({ message: "yo thats crazy bro" });
});

app.use('/api/chat',chatRoutes);

/* SERVER */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

