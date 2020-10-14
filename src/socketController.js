import events from "./events";

let sockets = [];

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data); //자신을 제외한 소켓에 메시지를 보낸다.
  const superBroadcase = (event, data) => io.emit(event, data); //전체 소켓에 메시지를 보낸다.
  const sendPlayerUpdate = () =>
    superBroadcase(events.playerUpdate, { sockets });

  socket.on(events.setNickname, ({ nickname }) => {
    //console.log(nickname);
    socket.nickname = nickname;

    sockets.push({ id: socket.id, points: 0, nickname: nickname });

    broadcast(events.newUser, { nickname });
    sendPlayerUpdate();
  });

  socket.on(events.disconnect, () => {
    console.log("disconnet");
    sockets = sockets.filter((aSocket) => aSocket.id !== socket.id);
    broadcast(events.disconnected, { nickname: socket.nickname });
    //disconnect 이미 사용중인 이름이라 계속 반복 호출되니 꼭 다른 이름으로 broadcast해야함
    sendPlayerUpdate();
  });

  socket.on(events.sendMsg, ({ message }) => {
    broadcast(events.newMsg, { nickname: socket.nickname, message });
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
