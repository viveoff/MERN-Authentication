import express from "express";
import dotenv from 'dotenv';
import { connectDataBase } from "./database/connectDataBase.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // allows us to parse icoming requests : req.body

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectDataBase();
    console.log("Server is running on port", PORT);
})


