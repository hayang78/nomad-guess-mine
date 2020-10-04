import { join } from "path";
import express from "express";

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views")); //views의 경로를 실제경로와 매핑시킨다.

app.get("/", (req, res) => res.render("home"));

const handleListening = () =>
  console.log(`Server running: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
