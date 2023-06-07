import { Socket } from "socket.io-client";

export default interface ISocketContext {
  socket: Socket | undefined;
  roomUsers: any;
}
