const notifications = document.getElementById("jsNotifications");

export const handleNewUser = ({ nickname }) => {
  console.log(nickname, " just joined");
};

if (window.socket) {
  window.socket.on(window.events.newUser, handleNewUser);
}
