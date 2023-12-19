"use client";
import { useSocket } from "@/contexts/SocketContext";
import React, { useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";
import ChatImage from "./ChatImage";

function ChatBody({ roomId }: { roomId: string }) {
  const [typing, setTyping] = useState<string>("");
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { messages, socket } = useSocket();

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket?.on("typing_response", (data) => {
      setTyping(data);
    });
  }, []);

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
          <div className="flex self-end flex-col items-end" key={index}>
            {message.text && <div className="flex justify-center items-center px-3 py-1 text-white rounded-full rounded-br-none bg-primary">
              <p className="font-sans">{message.text}</p>
            </div>}
            {message.image && <ChatImage imgURL={message.image} />}
          </div>
        ) : (
          <div className="flex gap-2 self-start" key={index}>
            <div className="self-center">
              <Avatar
                name={message.name}
                round={true}
                size="30"
                className="text-sm"
              />
            </div>
            <div>
              <p className="pl-2 text-sm align-bottom">{message.name}</p>
              {message.text && <div className={`px-3 py-1 bg-gray-200 rounded-full ${message.image ? "rounded-bl-none" : "rounded-tl-none"} w-fit dark:bg-gray-800`}>
                <p className="font-sans">{message.text}</p>
              </div>}
              {message.image && <ChatImage imgURL={message.image} />}
              <p className="py-2 pl-2 text-xs font-light">
                {new Date(message.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        )
      )}

      <div ref={lastMessageRef} data-testid="lastMessageRef" className="mt-auto text-slate-500">
        {typing}
      </div>
    </div>
  );
}

export default ChatBody;
