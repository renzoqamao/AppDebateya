import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import socketIO from "socket.io";
import path from "path";
import { createRoles } from "./helpers/initialSetup";
import config from "./config";

// doc
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { options } from "./helpers/swaggerOptions";
const specs = swaggerJSDoc(options);

const app = express();
createRoles();
//Settings
app.set("port", process.env.PORT || 4000);
//Middlewares
app.use(json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors({ origin: config.Origin }));

// documentation
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

//Routes
import UserRoutes from "./routes/User.routes";
import AuthRoutes from "./routes/Auth.routes";
import QuestionRoutes from "./routes/Question.routes";
import ChatRoutes from "./routes/Chat.routes";
import DashboardRoutes from "./routes/Dashboard.routes";
//Routes
app.use("/api", UserRoutes);
app.use("/api", AuthRoutes);
app.use("/api", QuestionRoutes);
app.use("/api", ChatRoutes);
app.use("/api", DashboardRoutes);

// Static Files
app.use(express.static(path.join(__dirname, "public")));
// Socket
const NEW_MESSAGE_EVENT = "new-message-event";
const room = "general";
const server = http.Server(app);
const io = socketIO(server, {
  cors: true,
  origin: [config.Origin],
});

io.on("connection", (socket) => {
  socket.join(room);

  socket.on(NEW_MESSAGE_EVENT, (data) => {
    io.in(room).emit(NEW_MESSAGE_EVENT, data);
  });

  socket.on("disconnect", () => {
    socket.leave(room);
  });
});
//con socket se exporta server
export { app, server };
