import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import logger from "morgan";
import socketController from "./socketController";
import events from "./events";

const PORT = 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", join(__dirname, "views")); //views의 경로를 실제경로와 매핑시킨다.
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res) =>
  res.render("home", { events: JSON.stringify(events) })
); //Frontend로 events.js를 전달해준다.

const handleListening = () =>
  console.log(`Server running: http://localhost:${PORT}`);

//ws(websocket)과 HTTP는 같은 포트 사용이 가능하다.
const server = app.listen(PORT, handleListening);

const io = socketIO.listen(server); //http://localhost:4000/socket.io/socket.io.js로 접속하여 연결 확인

io.on("connection", (socket) => socketController(socket));
