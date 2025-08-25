import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import deliveryRouter from "./routes/deliveeries.routes.js";
import ClerkRouter from "./routes/clerk-webhooks.routes.js";
import { clerkClient, clerkMiddleware } from "@clerk/express";

// configurations
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());

app.use("/api/deliveries", deliveryRouter);
app.use("/api", ClerkRouter);

const PORT = process.env.PORT;

// database connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// Socket.io for real time updates
io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("driverLocation", (data) => {
    // broadcast drivers location to client
    io.emit("updateLocation", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

app.get("/", async (req, res) => {
  const { data } = await clerkClient.users.getUserList();
  res.json({ users: data });
  console.log("user-data", data);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
