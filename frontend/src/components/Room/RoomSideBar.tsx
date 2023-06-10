"use client";
import React, { useState } from "react";
import RoomCard from "./RoomCard";
import IRoom from "@/interfaces/IRoom";
import { useRoom } from "@/contexts/RoomContext";
import { useSocket } from "@/contexts/SocketContext";
import { BiMessageAdd } from "react-icons/bi";
import AddRoomPanel from "./AddRoomPanel";

function RoomSideBar() {
  const [showAddRoomPanel, setShowAddRoomPanel] = useState(false);
  const { rooms } = useRoom();
  const { roomUsers } = useSocket();

  const hideAddRoomPanel = () => setShowAddRoomPanel(false);

  return (
    <div className="w-20 h-screen border-r-2 sm:w-1/4">
      <p className="px-2 py-5 sm:px-5 h-[56px] text-2xl font-semibold">Rooms</p>
      {rooms.map((room: IRoom, index) => {
        return (
          <RoomCard room={room} users={roomUsers[room.id] ?? []} key={index} />
        );
      })}
      <div
        className="flex justify-center items-center p-1 m-2 rounded-lg border-2 cursor-pointer text-primary border-primary hover:bg-primary hover:text-white"
        onClick={() => setShowAddRoomPanel(true)}
      >
        <BiMessageAdd size={30} />
      </div>
      {showAddRoomPanel && (
        <div>
          <AddRoomPanel hideAddRoomPanel={hideAddRoomPanel} />
        </div>
      )}
    </div>
  );
}

export default RoomSideBar;
