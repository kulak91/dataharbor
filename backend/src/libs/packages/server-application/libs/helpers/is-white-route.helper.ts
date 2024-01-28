import { type HttpMethod } from '~/libs/packages/http/http.js';
import { WHITE_ROUTES } from '~/libs/packages/server-application/server-application.js';

type Parameters = {
  path: string;
  method: HttpMethod;
};

const isWhiteRoute = ({ path, method }: Parameters): boolean => {
  return WHITE_ROUTES.some((route) => {
    return path.startsWith(route.path) && route.methods.includes(method);
  });
};

export { isWhiteRoute };
