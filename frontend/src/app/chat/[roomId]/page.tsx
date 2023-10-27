"use client";
import ChatBody from "@/components/Chat/ChatBody";
import ChatFooter from "@/components/Chat/ChatFooter";
import ChatHeader from "@/components/Chat/ChatHeader";
import { useSocket } from "@/contexts/SocketContext";
import { useUser } from "@/contexts/UserContext";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

function Page() {
  const { roomId } = useParams();
  const { socket, roomUsers } = useSocket();
  const { username } = useUser();

  useEffect(() => {
    if (roomUsers[roomId]?.includes(socket?.id)) return;
    // adding username to socket emit
    socket?.emit("join_room", { username, roomId });
  }, []);

  return (
    <div className="flex relative flex-col w-full h-screen">
      <ChatHeader roomId={roomId} />
      <ChatBody roomId={roomId} />
      <ChatFooter roomId={roomId} />
    </div>
  );
}

export default Page;
