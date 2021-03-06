import events from "./events";
import { chooseWord } from "./words";

let sockets = [];
let inProgress = false;
let word = null;
let leader = null;
let timeout = null;

const choooseLeader = () => sockets[Math.floor(Math.random() * sockets.length)];

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data); //자신을 제외한 소켓에 메시지를 보낸다.
  const superBroadcast = (event, data) => io.emit(event, data); //전체 소켓에 메시지를 보낸다.
  const sendPlayerUpdate = () =>
    superBroadcast(events.playerUpdate, { sockets });
  const startGame = () => {
    if (sockets.length > 1) {
      if (inProgress === false) {
        inProgress = true;
        leader = choooseLeader();
        word = chooseWord();
        superBroadcast(events.gameStarting);
        setTimeout(() => {
          superBroadcast(events.gameStarted);
          io.to(leader.id).emit(events.leaderNotif, { word });
          timeout = setTimeout(endGame, 30000);
        }, 3000);
      }
    }
  };
  const endGame = () => {
    inProgress = false;
    console.log("endgame");
    superBroadcast(events.gameEnded);
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    setTimeout(() => {
      startGame();
    }, 2000);
  };

  const addPoints = (id) => {
    sockets = sockets.map((socket) => {
      if (socket.id == id) {
        socket.points += 10;
      }
      return socket;
    });
    sendPlayerUpdate();
    endGame();
  };

  socket.on(events.setNickname, ({ nickname }) => {
    //console.log(nickname);
    socket.nickname = nickname;

    sockets.push({ id: socket.id, points: 0, nickname: nickname });

    broadcast(events.newUser, { nickname });
    sendPlayerUpdate();
    startGame();
  });

  socket.on(events.disconnect, () => {
    console.log("disconnet");
    sockets = sockets.filter((aSocket) => aSocket.id !== socket.id);
    if (sockets.length === 1 || (leader && socket.id === leader.id)) {
      endGame();
    }
    broadcast(events.disconnected, { nickname: socket.nickname });
    //disconnect 이미 사용중인 이름이라 계속 반복 호출되니 꼭 다른 이름으로 broadcast해야함
    sendPlayerUpdate();
  });

  socket.on(events.sendMsg, ({ message }) => {
    if (message === word) {
      superBroadcast(events.newMsg, {
        nickname: "Bot",
        message: `Winner is ${socket.nickname}, Word was: ${word}`,
      });
      addPoints(socket.id);
    } else {
      broadcast(events.newMsg, { nickname: socket.nickname, message });
    }
  });

  socket.on(events.beginPath, ({ x, y }) =>
    broadcast(events.beganPath, { x, y })
  );

  socket.on(events.strokePath, ({ x, y, color }) =>
    broadcast(events.strokedPath, { x, y, color })
  );

  socket.on(events.fill, ({ color }) => broadcast(events.filled, { color }));
};

//setInterval(() => console.log(sockets), 3000);

export default socketController;
