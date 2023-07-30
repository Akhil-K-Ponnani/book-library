import http from "http";
import app from "./app.js";
import logger from "./api/helpers/logger/logger.js";

export const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => logger.info(`Server Listening on Port : ${port}`));
