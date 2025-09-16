import express from "express";
import dotenv from "dotenv";

//carrega variáveis do .env
dotenv.config();

//instancia do express
const app = express();

//middleware que permite o Express entender requisições com corpo JSON
app.use(express.json());

app.use("/", (req, res) => {
  res.send("teste");
});

export default app;
