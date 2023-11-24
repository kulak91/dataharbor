import { Navigate, Outlet } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/enums.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';

type Props = {
  redirectPath?: AppRoute;
};

const PublicRouteLayout: React.FC<Props> = ({
  redirectPath = AppRoute.ROOT,
}) => {
  const { authenticatedUser } = useAppSelector(({ auth }) => auth);
  const hasUser = Boolean(authenticatedUser);

  return hasUser ? <Navigate to={redirectPath} /> : <Outlet />;
};

export { PublicRouteLayout };
