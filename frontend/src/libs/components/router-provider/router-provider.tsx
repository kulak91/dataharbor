import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from 'react-router-dom';

import { routes } from './libs/constants/constants.js';

const RouterProvider: React.FC = () => {
  return <ReactRouterProvider router={createBrowserRouter(routes)} />;
};

export { RouterProvider };
