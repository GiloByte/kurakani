"use client";
import ChatBody from "@/components/Chat/ChatBody";
import ChatFooter from "@/components/Chat/ChatFooter";
import ChatHeader from "@/components/Chat/ChatHeader";
import { useSocket } from "@/contexts/SocketContext";
import { useUser } from "@/contexts/UserContext";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const { roomId } = useParams();
  const { joinedRooms, setJoinedRooms } = useUser();
  const { socket } = useSocket();

  useEffect(() => {
    if (joinedRooms.includes(roomId)) return;
    socket?.emit("join_room", roomId);
    setJoinedRooms([...joinedRooms, roomId]);
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
