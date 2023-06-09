"use client";

import IUserContext from "@/interfaces/IUserContext";
import { createContext, useContext, useState } from "react";

const intialData: IUserContext = {
  username: "",
  uuid: "",
  setUsername: () => {},
  setUuid: () => {},
  joinedRooms: [],
  setJoinedRooms: () => {},
};

const UserContext = createContext<IUserContext>(intialData);

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [username, setUsername] = useState<string>("");
  const [uuid, setUuid] = useState<string>("");
  const [joinedRooms, setJoinedRooms] = useState<string[]>([]);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        uuid,
        setUuid,
        joinedRooms,
        setJoinedRooms,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
