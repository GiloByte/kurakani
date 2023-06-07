import { useRoom } from "@/contexts/RoomContext";
import React from "react";

function ChatHeader() {
  const { rooms } = useRoom();
  return <div className="basis-[7%] border-b-2"></div>;
}

export default ChatHeader;
