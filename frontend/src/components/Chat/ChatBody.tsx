"use client";
import { useMessage } from "@/contexts/MessageContext";
import { useUser } from "@/contexts/UserContext";
import React from "react";

function ChatBody({ roomId }: { roomId: string }) {
  const { messages } = useMessage();
  const { uuid } = useUser();
  console.log(messages);
  return (
    <div className="basis-[85%]">
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
    </div>
  );
}

export default ChatBody;
