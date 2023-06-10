"use client";
import { useSocket } from "@/contexts/SocketContext";
import React, { useEffect, useRef } from "react";
import Avatar from "react-avatar";

function ChatBody({ roomId }: { roomId: string }) {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { messages, socket } = useSocket();

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="basis-[85%] overflow-y-scroll p-5 w-full flex flex-col gap-2">
      {messages[roomId]?.map((message: any, index: number) =>
        message.socketId === "kurakani" ? (
          <div className="flex self-center" key={index}>
            <div className="flex justify-center items-center">
              <p>{message.text}</p>
            </div>
          </div>
        ) : message.socketId === socket?.id ? (
          <div className="flex self-end" key={index}>
            <div className="flex justify-center items-center px-3 py-1 text-white rounded-full rounded-br-none bg-primary">
              <p className="font-sans">{message.text}</p>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 self-start" key={index}>
            <div className="self-end">
              <Avatar
                name={message.name}
                round={true}
                size="30"
                className="text-sm"
              />
            </div>
            <div>
              <p className="pl-2 text-xs">{message.name}</p>
              <div className="flex justify-center items-center px-3 py-1 bg-gray-200 rounded-full rounded-tl-none">
                <p className="font-sans">{message.text}</p>
              </div>
            </div>
          </div>
        )
      )}
      <div ref={lastMessageRef} />
    </div>
  );
}

export default ChatBody;
