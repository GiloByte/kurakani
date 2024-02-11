import { createBrowserRouter } from 'react-router-dom';
import { Home, Lobby, PageNotFound } from './pages';
import { ProtectedRoute } from './components';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/u',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'lobby',
        element: <Lobby />,
      },
    ],
  },
  {
    path: '/*',
    element: <PageNotFound />,
  },
]);
