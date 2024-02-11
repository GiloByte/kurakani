import React, { createContext, useEffect } from 'react';
import { PropsWithChildren, useState } from 'react';
import { User, emptyUser } from './User';

export const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  user: emptyUser,
  setUser: () => {},
});

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    console.log('user from storage', user);
    if (user) {
      const parsed = JSON.parse(user);
      if (parsed.token) {
        setUser(parsed);
      }
    } else {
      setUser(emptyUser);
    }
  }, []);

  console.log('user', user);

  if (!user) return;

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}
