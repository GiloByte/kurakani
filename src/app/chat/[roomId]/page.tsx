"use client";
import ChatBody from "@/components/Chat/ChatBody";
import ChatFooter from "@/components/Chat/ChatFooter";
import ChatHeader from "@/components/Chat/ChatHeader";
import { useSocket } from "@/contexts/SocketContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  const { socket } = useSocket();

  useEffect(() => {
    socket?.emit("join_room", roomId);
  }, []);

  return (
    <div className="flex flex-col w-full h-screen">
      <ChatHeader roomId={roomId} />
      <ChatBody />
      <ChatFooter />
    </div>
  );
}

export default page;