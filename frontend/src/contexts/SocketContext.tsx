"use client";
import IMessage from "@/interfaces/IMessage";
import ISocketContext from "@/interfaces/ISocketContext";
import { BASE_URL } from "@/utils/constants";
import { createContext, useContext, useEffect, useState } from "react";
import * as socketIO from "socket.io-client";
import { useUser } from "./UserContext";
import { useRouter } from "next/navigation";

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

  const { username } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!username) {
      router.replace("/");
      return;
    }
    let socket = socketIO.connect(BASE_URL);
    socket.on("receive_message", (data: IMessage) => {
      setMessages((prev) => {
        const newMessages = { ...prev };
        newMessages[data.roomId] = [...(newMessages[data.roomId] ?? []), data];
        return newMessages;
      });
    });
    socket.on("users_response", (data) => setRoomUsers(data));
    setSocket(socket);
  }, []);

  return (
    <SocketContext.Provider value={{ socket, roomUsers, messages }}>
      {children}
    </SocketContext.Provider>
  );
}
