import { RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { router } from './appRouter';
import { GOOGLE_AUTH_CLIENT_ID } from './lib/constants';
import { UserProvider } from './contexts';

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_AUTH_CLIENT_ID!}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </GoogleOAuthProvider>
  );
}
