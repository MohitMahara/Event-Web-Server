import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./Config/db.js";
import { errorMiddleware } from "./Middlewares/errorMiddleware.js";
import authRoutes from "./Routes/authRoutes.js";
import eventsRoutes from "./Routes/eventsRoutes.js";
import updateEventListRoute from "./Routes/updateUserRoute.js";

const app = express();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());



// routes
app.use("/api/v1/update/",updateEventListRoute);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/events",eventsRoutes);





app.get("/", (req, res) =>{
    res.send("<h1>Hello World</h1>");
});




// Error Middleware

app.use(errorMiddleware);


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})