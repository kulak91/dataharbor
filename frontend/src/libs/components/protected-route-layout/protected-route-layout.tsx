import { Navigate, Outlet } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/enums.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';

type Props = {
  redirectPath?: AppRoute;
};

const ProtectedRouteLayout: React.FC<Props> = ({
  redirectPath = AppRoute.SIGN_IN,
}) => {
  const { authenticatedUser } = useAppSelector(({ auth }) => auth);
  const hasUser = Boolean(authenticatedUser);

  return hasUser ? <Outlet /> : <Navigate to={redirectPath} />;
};

export { ProtectedRouteLayout };
