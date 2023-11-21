import { type AppRouteParameters } from '~/libs/packages/server-application/libs/types/app-route-parameters.type.js';

type DefaultApiHandlerOptions = {
  headers?: Parameters<AppRouteParameters['handler']>[0]['headers'];
  body?: unknown;
  query?: unknown;
  params?: unknown;
};

type ApiHandlerOptions<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
  body: T['body'];
  query: T['query'];
  params: T['params'];
  headers: Parameters<AppRouteParameters['handler']>[0]['headers'];
};

export { type ApiHandlerOptions };
