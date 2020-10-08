import events from "./events";

const socketController = (socket) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);

  socket.on(events.setNickname, ({ nickname }) => {
    //console.log(nickname);
    socket.nickname = nickname;
    broadcast(events.newUser, { nickname });
  });

  socket.on(events.disconnect, () => {
    console.log("disconnet");
    broadcast(events.disconnected, { nickname: socket.nickname });
    //disconnect 이미 사용중인 이름이라 계속 반복 호출되니 꼭 다른 이름으로 broadcast해야함
  });
};

export default socketController;
