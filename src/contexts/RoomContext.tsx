"use client";
import IRoomContext from "@/interfaces/IRoomContext";
import { BASE_URL } from "@/utils/constants";
import { createContext, useContext, useEffect, useState } from "react";

const intialData: IRoomContext = {
  rooms: [],
};

const RoomContext = createContext<IRoomContext>(intialData);

export function useRoom() {
  return useContext(RoomContext);
}

export default function RoomProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function fetchRooms() {
      const response = await fetch(BASE_URL + "rooms");
      const rooms = await response.json();
      setRooms(rooms);
    }
    fetchRooms();
  }, []);

  const value = { rooms };
  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
}
