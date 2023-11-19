import './main.css';

import { type FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { Loader } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/data-status.enum';
import { useAppDispatch, useAppSelector } from '~/libs/hooks/hooks.js';
import { actions as authActions } from '~/slices/auth/auth.js';

const App: FC = () => {
  const dispatch = useAppDispatch();

  const { authenticatedUserDataStatus } = useAppSelector(({ auth }) => auth);

  useEffect(() => {
    void dispatch(authActions.getAuthenticatedUser());
  }, [dispatch]);

  if (
    authenticatedUserDataStatus === DataStatus.PENDING ||
    authenticatedUserDataStatus === DataStatus.IDLE
  ) {
    return <Loader />;
  }

  return <Outlet />;
};

export { App };
