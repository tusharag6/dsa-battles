import { createServer } from "node:http";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { Server as SocketIOServer } from "socket.io";
import { createMatch } from "./services/matchService";

const app = express();
app
  .disable("x-powered-by")
  .use(morgan("dev"))
  .use(express.json())
  .use(cors({ origin: "*", methods: ["GET", "POST"], credentials: true }))
  .get("/message/:name", (req, res) =>
    res.json({ message: `Hello ${req.params.name}` }),
  )
  .get("/status", (_, res) => res.json({ ok: true }));

const httpServer = createServer(app);

const io = new SocketIOServer(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"], credentials: true },
});

let matchmakingQueue: { username: string; socketId: string }[] = [];
const matchTimeouts = new Map();

async function matchPlayer() {
  if (matchmakingQueue.length >= 2) {
    const player1 = matchmakingQueue.shift() as {
      username: string;
      socketId: string;
    };
    const player2 = matchmakingQueue.shift() as {
      username: string;
      socketId: string;
    };

    io.to(player1.socketId).emit("matched", { opponent: player2?.username });
    io.to(player2.socketId).emit("matched", { opponent: player1?.username });

    // Create a new match
    // TODO: use user id instead of username
    await createMatch(player1.username, player2.username);

    console.log(`Matched players: ${player1.username} and ${player2.username}`);

    // Clear timeouts for both players after they are matched
    if (matchTimeouts.has(player1.socketId)) {
      clearTimeout(matchTimeouts.get(player1.socketId));
      matchTimeouts.delete(player1.socketId);
    }
    if (matchTimeouts.has(player2.socketId)) {
      clearTimeout(matchTimeouts.get(player2.socketId));
      matchTimeouts.delete(player2.socketId);
    }
  }
}

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);

  socket.on("joinQueue", ({ username }) => {
    console.log(`Player joined queue: ${username}`);
    matchmakingQueue.push({ username, socketId: socket.id });

    // Add a timeout to remove a user from the queue if no match is found within a certain time
    const timeoutId = setTimeout(() => {
      matchmakingQueue = matchmakingQueue.filter(
        (player) => player.socketId !== socket.id,
      );
      io.to(socket.id).emit("matchTimeout", {
        message: "Matchmaking timed out. Please try again.",
      });
      console.log(`Player left queue: ${username}`);
    }, 30000);

    matchTimeouts.set(socket.id, timeoutId);

    matchPlayer();
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);

    // Remove player from queue if they were waiting
    matchmakingQueue = matchmakingQueue.filter(
      (player) => player.socketId !== socket.id,
    );

    // clear any matchmaking timeouts for disconnected player
    if (matchTimeouts.has(socket.id)) {
      clearTimeout(matchTimeouts.get(socket.id));
      matchTimeouts.delete(socket.id);
    }
  });
});

const port = process.env.PORT || 5001;
httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
