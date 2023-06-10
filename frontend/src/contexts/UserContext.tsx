"use client";

import IUserContext from "@/interfaces/IUserContext";
import { createContext, useContext, useState } from "react";

const intialData: IUserContext = {
  username: "",
  setUsername: () => {},
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

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
