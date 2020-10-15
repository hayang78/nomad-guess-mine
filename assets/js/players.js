import { disableChat, enableChat } from "./chat";
import {
  disableCanvas,
  enableCanvas,
  hideControls,
  resetCanvas,
  showControls,
} from "./paint";

const board = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");

const addPlayers = (players) => {
  board.innerHTML = "";
  players.forEach((player) => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname}: ${player.points}`;
    board.appendChild(playerElement);
  });
};

const setNotifs = (text) => {
  notifs.innerText = "";
  notifs.innerText = text;
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = () => {
  console.log("gameStarted");
  setNotifs("");
  //disable canvas events
  disableCanvas();
  //hide the canvas controls
  hideControls();
};

export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  disableChat();
  setNotifs(`You are the leader, paint: ${word}`);
};

export const handleGameEnded = () => {
  setNotifs("Game ended");
  disableCanvas();
  hideControls();
  resetCanvas();
  enableChat();
};

export const handleGameStarting = () => {
  setNotifs("Game will start soon");
};
