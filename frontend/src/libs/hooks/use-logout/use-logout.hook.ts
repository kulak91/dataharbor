import { useEffect } from 'react';

import { useAppDispatch } from '~/libs/hooks/hooks.js';
import { actions as authActions } from '~/slices/auth/auth.js';

const useLogout = (): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(authActions.signOut());
  }, []);
};

export { useLogout };
