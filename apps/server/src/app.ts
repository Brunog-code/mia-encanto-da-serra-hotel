import express from "express";
import dotenv from "dotenv";

//routes
import imageRoutes from './routes/imageRoutes.js'

//carrega variáveis do .env
dotenv.config();

//instancia do express
const app = express();

//middleware que permite o Express entender requisições com corpo JSON
app.use(express.json());

//grupo de rotas
app.use("/images", imageRoutes)

export default app;
