"use client";
import { useSocket } from "@/contexts/SocketContext";
import { useUser } from "@/contexts/UserContext";
import React, { useEffect, useRef } from "react";

function ChatBody({ roomId }: { roomId: string }) {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { messages } = useSocket();
  const { uuid } = useUser();

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="basis-[85%] overflow-y-scroll">
      {messages[roomId]?.map((message: any, index: number) =>
        message.id === uuid ? (
          <div className="message__chats" key={index}>
            <p className="sender__name">You</p>
            <div className="message__sender">
              <p>{message.text}</p>
            </div>
          </div>
        ) : (
          <div className="message__chats" key={index}>
            <p>{message.name}</p>
            <div className="message__recipient">
              <p>{message.text}</p>
            </div>
          </div>
        )
      )}
      <div ref={lastMessageRef} />
    </div>
  );
}

export default ChatBody;
