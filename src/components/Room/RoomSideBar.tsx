import React from "react";
import RoomCard from "./RoomCard";
import IRoom from "@/interfaces/IRoom";
import { useRoom } from "@/contexts/RoomContext";

function RoomSideBar() {
  const { rooms } = useRoom();
  return (
    <div className="w-1/4 h-screen border-r-2">
      <p className="p-5 text-2xl font-semibold">Rooms</p>
      {rooms.map((room: IRoom, index) => {
        return <RoomCard room={room} key={index} />;
      })}
    </div>
  );
}

export default RoomSideBar;
