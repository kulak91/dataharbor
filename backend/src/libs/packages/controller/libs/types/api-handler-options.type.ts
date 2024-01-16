import { type AppRouteParameters } from '~/libs/packages/server-application/libs/types/app-route-parameters.type.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

type DefaultApiHandlerOptions = {
  headers?: Parameters<AppRouteParameters['handler']>[0]['headers'];
  body?: unknown;
  query?: unknown;
  params?: unknown;
  user?: UserAuthResponseDto;
  client_ip?: Parameters<AppRouteParameters['handler']>[0]['ip'];
};

type ApiHandlerOptions<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
  body: T['body'];
  query: T['query'];
  params: T['params'];
  user: T['user'];
  client_ip: Parameters<AppRouteParameters['handler']>[0]['ip'];
  headers: Parameters<AppRouteParameters['handler']>[0]['headers'];
};

export { type ApiHandlerOptions };
