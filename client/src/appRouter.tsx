import { createBrowserRouter } from 'react-router-dom';
import { Home, PageNotFound } from './pages';

export const router = createBrowserRouter([
  {
    path: '',
    element: <Home />,
  },
  {
    path: '/*',
    element: <PageNotFound />,
  },
]);
