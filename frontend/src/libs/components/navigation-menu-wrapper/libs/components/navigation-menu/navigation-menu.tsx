import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppDispatch } from '~/libs/hooks/hooks.js';
import { actions as authActions } from '~/slices/auth/auth.js';

  import type { NavRoute } from '../../types/types';
  import styles from './styles.module.scss';

  type Props = {
    routes: NavRoute[];
  };

  const NavigationMenu: FC<Props> = ({ routes }) => {
  const dispatch = useAppDispatch();

  const handleSignOut = ():void => {

    void dispatch(authActions.signOut());
  };

  return (
    <nav className={styles['container']}>
      {routes.map((route) => (
        <NavLink key={route.path} to={route.path} title={route.name} className={({ isActive }): string => getValidClassNames(styles['link'], isActive && styles['activeLink']) }>{route.name}</NavLink>
      ))}
      <button className={styles['logout']} onClick={handleSignOut}>Logout</button>
    </nav>
  );
};

export { NavigationMenu };
