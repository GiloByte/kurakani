"use client";
import { useRoom } from "@/contexts/RoomContext";
import React, { useState } from "react";
import Popup from "../shared/Popup";

function ChatHeader({ roomId }: { roomId: string }) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { rooms, myRooms } = useRoom();
  const room = rooms.concat(myRooms).find((room) => room.id === roomId);
  return (
    <div className="basis-[7%] border-b-2 flex items-center justify-between p-3 font-medium border-gray dark:border-gray-800">
      <p className="text-xl">{room?.title}</p>
      <button
        type="submit"
        className="btn"
        onClick={() => {
          navigator.clipboard.writeText(roomId);
          setIsCopied(true);
        }}
      >
        Copy Room ID
      </button>
      <Popup
        text="Room ID copied!"
        showPopup={isCopied}
        setShowPopup={setIsCopied}
      />
    </div>
  );
}

export default ChatHeader;
