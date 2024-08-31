import express from "express";
import dotenv from 'dotenv';
import { connectDataBase } from "./database/connectDataBase.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
    res.send("Hello");
});

app.use("/api/auth", authRoutes);

app.listen(3000, () => {
    connectDataBase();
    console.log("Server is running on port 3000");
})


