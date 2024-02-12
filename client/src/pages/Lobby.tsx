import { useLogout } from '../lib';

export function Lobby() {
  const logout = useLogout();

  return (
    <div className="py-6 flex flex-col gap-8">
      <p>Welcome to lobby</p>
      <button type="button" onClick={logout} className="px-4 py-2 text-white bg-red-500 rounded-md w-32">
        Logout
      </button>
    </div>
  );
}
