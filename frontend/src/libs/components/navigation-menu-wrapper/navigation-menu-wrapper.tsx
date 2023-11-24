import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/app-route.enum';

import { NavigationMenu } from './libs/components/navigation-menu/navigation-menu.jsx';
import type { NavRoute } from './libs/types/types';
import styles from './styles.module.scss';

const NAVIGATION_ROUTES: NavRoute[] = [
  {
    name: 'Settings',
    path: AppRoute.SETTINGS,
  },
  {
    name: 'Dashboard',
    path: AppRoute.ROOT,
  },
];

const NavigationMenuWrapper: FC = () => {
  return (
    <div className={styles['app']}>
      <NavigationMenu routes={NAVIGATION_ROUTES} />
      <main className={styles['body']}>
        <Outlet />
      </main>
    </div>
  );
};

export { NavigationMenuWrapper };
