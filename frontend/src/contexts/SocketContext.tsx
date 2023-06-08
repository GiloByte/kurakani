"use client";
import ISocketContext from "@/interfaces/ISocketContext";
import { BASE_URL } from "@/utils/constants";
import { createContext, useContext, useState } from "react";
import * as socketIO from "socket.io-client";

const intialData: ISocketContext = {
  socket: undefined,
  roomUsers: {},
};

const SocketContext = createContext<ISocketContext>(intialData);

export function useSocket() {
  return useContext(SocketContext);
}

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [roomUsers, setRoomUsers] = useState({});
  const socket = socketIO.connect(BASE_URL);

  socket?.on("users_response", (data: any) => setRoomUsers(data));

  return (
    <SocketContext.Provider value={{ socket, roomUsers }}>
      {children}
    </SocketContext.Provider>
  );
}
