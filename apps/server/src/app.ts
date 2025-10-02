import express from "express";
import cors from 'cors'
import dotenv from "dotenv";

//routes
import imageRoutes from './routes/imageRoutes.js'

//carrega variáveis do .env
dotenv.config();

//instancia do express
const app = express();

//middleware que permite o Express entender requisições com corpo JSON
app.use(express.json());

//libera acesso
app.use(cors())

//grupo de rotas
app.use("/images", imageRoutes)

export default app;
