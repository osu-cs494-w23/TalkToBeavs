import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import register from "./routes/auth/register.js";
import login from "./routes/auth/login.js";
import get_user from "./routes/auth/get_user.js";

import { Server, Socket } from "socket.io";
import newConnection from "./sockets/handlers/new_connection.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/auth/user", get_user);

// Default Route
app.get("/", (req, res) => {
  res.send("Hello TalkToBeavs!");
});
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("[Backend ⚡️]: Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const server = app.listen(PORT, () => {
  console.log(`[Backend ⚡️]: Server is running on port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  newConnection(socket, io);
});
