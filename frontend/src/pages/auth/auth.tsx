import type { FC } from 'react';
import { useCallback } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/enums.js';
import { useAppDispatch, useAppSelector } from '~/libs/hooks/hooks.js';
import {
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
} from '~/packages/users/users.js';
import { actions as authActions } from '~/slices/auth/auth.js';

import { SignInForm, SignUpForm } from './components/components.js';
import styles from './styles.module.scss';

const Auth: FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const { authenticatedUser } = useAppSelector(({ auth }) => auth);

  if (authenticatedUser) {
    return <Navigate to={AppRoute.ROOT} />;
  }

  const handleSignInSubmit = useCallback(
    (payload: UserSignInRequestDto): void => {
      void dispatch(authActions.signIn(payload));
    },
    [dispatch],
  );

  const handleSignUpSubmit = useCallback(
    (payload: UserSignUpRequestDto): void => {
      void dispatch(authActions.signUp(payload));
    },
    [dispatch],
  );

  const getScreen = (screen: string): React.ReactNode => {
    switch (screen) {
      case AppRoute.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
      }

      case AppRoute.SIGN_UP: {
        return <SignUpForm onSubmit={handleSignUpSubmit} />;
      }
    }

    return null;
  };

  return <div className={styles['auth']}>{getScreen(pathname)}</div>;
};

export { Auth };
