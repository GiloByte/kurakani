import { useContext } from 'react';
import { UserContext } from '.';

export function useUser() {
  return useContext(UserContext);
}
