import type { RouteObject } from 'react-router-dom';

import {
  App,
  NavigationMenuWrapper,
  ProtectedRouteLayout,
  PublicRouteLayout,
} from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { Auth } from '~/pages/auth/auth.js';
import { Dashboard } from '~/pages/dashboard/dashboard.js';
import { Settings } from '~/pages/settings/settings.js';

const routes: RouteObject[] = [
  {
    path: AppRoute.ROOT,
    element: <App />,
    children: [
      {
        path: AppRoute.ROOT,
        element: <ProtectedRouteLayout />,
        children: [
          {
            element: <NavigationMenuWrapper/>,
            children: [{
              path: AppRoute.ROOT,
              element: <Dashboard />,
            },
            {
              path: AppRoute.SETTINGS,
              element: <Settings />,
            },
          ]
          }
        ],
      },
      {
        element: <PublicRouteLayout />,
        children: [
          {
            path: AppRoute.SIGN_IN,
            element: <Auth />,
          },
          {
            path: AppRoute.SIGN_UP,
            element: <Auth />,
          },
        ],
      },
    ],
  },
];

export { routes };
