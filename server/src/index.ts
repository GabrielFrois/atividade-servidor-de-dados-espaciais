import express from "express";
import dotenv from "dotenv";
import cidadeRouter from "./routes/cidade";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/cidade", cidadeRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});