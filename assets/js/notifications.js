const notifications = document.getElementById("jsNotifications");

const fireNotification = (text, color) => {
  const notification = document.createElement("div");
  notification.innerText = text;
  notification.style.backgroundColor = color;
  notification.className = "notification";
  notifications.appendChild(notification);
};

export const handleNewUser = ({ nickname }) => {
  console.log("connect");
  fireNotification(`${nickname} just joined!`, "rgb(0, 122, 255");
  //console.log(nickname, " just joined");
};

export const handleDisconnected = ({ nickname }) => {
  console.log("disconnect");
  fireNotification(`${nickname} just left!`, "rgb(255, 149, 0");
};

if (window.socket) {
  window.socket.on(window.events.newUser, handleNewUser);
}
