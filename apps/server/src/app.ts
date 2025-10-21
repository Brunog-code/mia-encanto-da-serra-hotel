import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

//routes
import imageRoutes from "./routes/imageRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";
import cronRoutes from "./routes/cronRoutes.js";

//instancia do express
const app = express();

//middleware que permite o Express entender requisições com corpo JSON
app.use(express.json());

//libera acesso
app.use(cors());

//grupo de rotas
app.use("/images", imageRoutes);
app.use("/rooms", roomRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/reservation", reservationRoutes);
app.use("/payment", paymentRoutes);
app.use("/webhook", webhookRoutes);
app.use("/cron", cronRoutes);

export default app;
