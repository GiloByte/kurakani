"use client";
import ChatBody from "@/components/Chat/ChatBody";
import ChatFooter from "@/components/Chat/ChatFooter";
import ChatHeader from "@/components/Chat/ChatHeader";
import { useSocket } from "@/contexts/SocketContext";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const { roomId } = useParams();
  const { socket, roomUsers } = useSocket();

  useEffect(() => {
    if (roomUsers[roomId]?.includes(socket?.id)) return;
    socket?.emit("join_room", roomId);
  }, []);

  return (
    <div className="flex flex-col w-full h-screen">
      <ChatHeader roomId={roomId} />
      <ChatBody roomId={roomId} />
      <ChatFooter roomId={roomId} />
    </div>
  );
}

export default page;
