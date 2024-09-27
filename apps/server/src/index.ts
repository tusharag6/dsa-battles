import { createServer } from "node:http";
import cors from "cors";
import express, { response } from "express";
import morgan from "morgan";
import { Server as SocketIOServer } from "socket.io";
import { createMatch } from "./services/matchService";
import axios from "axios";
import { db, problemsTable, submissionsTable, testCasesTable } from "./db";
import env from "./db/env";
import { eq } from "drizzle-orm";

const app = express();
app
  .disable("x-powered-by")
  .use(morgan("dev"))
  .use(express.json())
  .use(cors({ origin: "*", methods: ["GET", "POST"], credentials: true }))
  .get("/message/:name", (req, res) =>
    res.json({ message: `Hello ${req.params.name}` })
  )
  .get("/status", (_, res) => res.json({ ok: true }));

const httpServer = createServer(app);

const io = new SocketIOServer(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"], credentials: true },
});

let matchmakingQueue: { username: string; socketId: string }[] = [];
const matchTimeouts = new Map();

const JUDGE0_API = env.JUDGE0_URL;

interface CodeSubmission {
  user_id: number;
  problem_id: number;
  source_code: string;
  language_id: number;
}

interface SubmissionResult {
  stdout: string;
  stderr: string;
  status: {
    id: number;
    description: string;
  };
  compile_output: string;
  time: string;
  memory: number;
}

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

async function submitCode(
  submission: CodeSubmission
): Promise<SubmissionResult> {
  try {
    console.log("SUBMISSION: ", submission);

    const response = await axios.post("http://localhost:2358/submissions", {
      source_code: submission.source_code,
      language_id: submission.language_id,
      stdin: "",
    });

    console.log("RESPONSE: ", response);

    const { token } = response.data;

    console.log("TOKEN: ", token);

    const statusResponse = await axios.get(
      `${JUDGE0_API}/submissions/${token}?wait=true`
    );
    console.log("STATUS RESPONSE: ", statusResponse.data);
    return statusResponse.data;
  } catch (error) {
    console.log(
      "====================================================================="
    );
    console.error("Error submitting code:", error);
    console.log(
      "====================================================================="
    );

    throw error;
  }
}
async function saveSubmissionResult(
  submission: CodeSubmission,
  result: SubmissionResult
) {
  try {
    await db.insert(submissionsTable).values({
      source_code: submission.source_code,
      status: "",
      execution_time: parseFloat(result.time),
      memory_usage: result.memory,
      language_id: submission.language_id,
      problem_id: submission.problem_id,
    });
  } catch (error) {
    console.error("Error saving submission result:", error);
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
        (player) => player.socketId !== socket.id
      );
      io.to(socket.id).emit("matchTimeout", {
        message: "Matchmaking timed out. Please try again.",
      });
      console.log(`Player left queue: ${username}`);
    }, 30000);

    matchTimeouts.set(socket.id, timeoutId);

    matchPlayer();
  });

  socket.on("codeSubmission", async (submission: CodeSubmission) => {
    try {
      console.log("submission: ", submission);
      const result = await submitCode(submission);
      socket.emit("submissionResult", result);

      await saveSubmissionResult(submission, result);
    } catch (error) {
      socket.emit("error", "Error processing your submission");
    }
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);

    // Remove player from queue if they were waiting
    matchmakingQueue = matchmakingQueue.filter(
      (player) => player.socketId !== socket.id
    );

    // clear any matchmaking timeouts for disconnected player
    if (matchTimeouts.has(socket.id)) {
      clearTimeout(matchTimeouts.get(socket.id));
      matchTimeouts.delete(socket.id);
    }
  });
});

app.get("/api/problems", async (req, res) => {
  try {
    const result = await db
      .select({
        id: problemsTable.id,
        title: problemsTable.title,
        description: problemsTable.description,
        difficulty: problemsTable.difficulty,
      })
      .from(problemsTable);
    res.send(result);
  } catch (error) {
    console.error("Error fetching problems:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/problems/:id", async (req, res) => {
  const problemId = parseInt(req.params.id);
  try {
    const problem = await db
      .select()
      .from(problemsTable)
      .where(eq(problemsTable.id, problemId));
    const testCases = await db
      .select()
      .from(testCasesTable)
      .where(eq(testCasesTable.problem_id, problemId));

    if (problem.length === 0) {
      res.status(404).json({ error: "Problem not found" });
    } else {
      res.send({ problem, testCases });
    }
  } catch (error) {
    console.error("Error fetching problem details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = process.env.PORT || 5001;
httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
