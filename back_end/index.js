
import authRoutes from "./routes/authRoutes.js"
import dotenv from "dotenv"
dotenv.config();
import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"



const app = express();
app.use(cookieParser());
app.use(cors({
    origin: `http://localhost:${process.env.FRONT_PORT}`,
    credentials: true,
}));
app.use(express.json());

app.use("/user", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
