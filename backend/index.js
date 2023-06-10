require("dotenv").config();
const roomRoutes = require("./routes/roomRoutes");
const { app, server } = require("./routes/socket");
const debugPrint = require("./utils/debugPrint");

app.use("/rooms", roomRoutes);

server.listen(process.env.PORT | 4000, () => {
  debugPrint("SERVER RUNNING");
});
