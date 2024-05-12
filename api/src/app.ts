import express from "express";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import requestsRouter from "./routes/requests.js";
import wagesRouter from "./routes/wages.js";

export const app = express();

app.set("port", process.env.PORT || 8080);

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Routes
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/requests", requestsRouter);
app.use("/wages", wagesRouter);

app.get("/", (req, res) => {
  res.send("Status: alive");
});
