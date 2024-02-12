import React, { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { User } from './User';

export const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => {},
});

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      try {
        const parsed = JSON.parse(userFromStorage);
        if (parsed.token) {
          setUser(parsed);
        }
      } catch (err: any) {
        console.log(err.message);
      }
    }
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}
