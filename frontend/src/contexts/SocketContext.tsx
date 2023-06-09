"use client";
import IMessage from "@/interfaces/IMessage";
import ISocketContext from "@/interfaces/ISocketContext";
import { BASE_URL } from "@/utils/constants";
import { createContext, useContext, useEffect, useState } from "react";
import * as socketIO from "socket.io-client";

const intialData: ISocketContext = {
  socket: undefined,
  roomUsers: {},
  messages: {},
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
  const [socket, setSocket] = useState<socketIO.Socket>();
  const [messages, setMessages] = useState<{ [key: string]: IMessage[] }>({});

  useEffect(() => {
    let socket = socketIO.connect(BASE_URL);
    socket.on("receive_message", (data: IMessage) => {
      setMessages((prev) => {
        let new_messages = { ...prev };
        if (new_messages[data.roomId]) new_messages[data.roomId].push(data);
        else new_messages[data.roomId] = [data];
        return new_messages;
      });
    });
    setSocket(socket);
  }, []);

  return (
    <SocketContext.Provider value={{ socket, roomUsers, messages }}>
      {children}
    </SocketContext.Provider>
  );
}
