import type { ValueOf } from '~/libs/types/value-of.type.js';

const AppRoute = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  SETTINGS: '/settings',
} as const;

type AppRoute = ValueOf<typeof AppRoute>;

export { AppRoute };
