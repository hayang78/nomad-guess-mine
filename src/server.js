import express from "express";

const PORT = 4000;
const app = express();
app.set("views engine", "pug");

const handleListening = () =>
  console.log(`Server running: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
