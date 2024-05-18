import express from "express";
import routes from "./routes/routes";
import { Router } from "express";
import { connectDB } from "./connectDb";
const router = express.Router();
const app = express();
connectDB();
app.use(express.json());
app.use("/api", routes);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`the server is listening for port :${port}`);
});
