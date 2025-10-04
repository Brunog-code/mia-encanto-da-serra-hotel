import express from "express";
import dotenv from "dotenv";
dotenv.config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_ANON_KEY:", process.env.SUPABASE_ANON_KEY?.slice(0, 10) + "..."); // só exibe o começo
console.log("SECRET_KEY:", process.env.SECRET_KEY);

import cors from 'cors'

//routes
import imageRoutes from './routes/imageRoutes.js'
import roomRoutes from './routes/roomRoutes.js'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'

//instancia do express
const app = express();

//middleware que permite o Express entender requisições com corpo JSON
app.use(express.json());

//libera acesso
app.use(cors())

//grupo de rotas
app.use("/images", imageRoutes)
app.use("/rooms", roomRoutes)
app.use("/users", userRoutes)
app.use("/auth", authRoutes)

export default app;
