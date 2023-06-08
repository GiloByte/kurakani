"use client";
import IMessageContext from "@/interfaces/IMessageContext";
import { createContext, useContext, useState } from "react";
import { useSocket } from "./SocketContext";
import IMessage from "@/interfaces/IMessage";

const intialData: IMessageContext = {
  messages: {},
};

const MessageContext = createContext<IMessageContext>(intialData);

export function useMessage() {
  return useContext(MessageContext);
}

export default function MessageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messages, setMessages] = useState<{ [key: string]: IMessage[] }>({});
  const { socket } = useSocket();

  socket?.on("receive_message", (data: IMessage) => {
    let new_messages = { ...messages };
    if (new_messages[data.roomId]) new_messages[data.roomId].push(data);
    else new_messages[data.roomId] = [data];
    console.log(new_messages);
    setMessages(new_messages);
  });

  return (
    <MessageContext.Provider value={{ messages }}>
      {children}
    </MessageContext.Provider>
  );
}
