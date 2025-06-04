import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const names = [
  "Peter Parker",
  "Diana Prince",
  "Bruce Wayne",
  "Natasha Romanoff",
  "Clark Kent",
];
const statuses = [
  "Working out",
  "Completed a 5K run!",
  "Started a new yoga routine",
  "Plank challenge complete",
  "Waiting for a challenge",
];
const avatars = [
  "/avatars/1.png",
  "/avatars/2.png",
  "/avatars/3.png",
  "/avatars/4.png",
  "/avatars/5.png",
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getCurrentTimestamp() {
  return new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

// Random messages to mock updates from other users
setInterval(() => {
  const update = {
    id: Date.now(),
    avatar: getRandomItem(avatars),
    status: getRandomItem(statuses),
    name: getRandomItem(names),
    timestamp: getCurrentTimestamp(),
  };

  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(update));
    }
  });
}, 9000);

wss.on("connection", (ws) => {
  console.log("Client connected");

  // To catch any message from client
  ws.on("message", (message) => {
    console.log("Received custom message:", message.toString());

    // Broadcast
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (err) => {
    console.error("❌ WebSocket error:", err);
  });
});
