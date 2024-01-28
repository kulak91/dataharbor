const AuthApiPath = {
  ROOT: '/',
  SIGN_UP: '/sign-up',
  SIGN_IN: '/sign-in',
  SIGN_OUT: '/sign-out',
  AUTHENTICATED_USER: '/authenticated-user',
  REFRESH_TOKEN: '/refresh-token',
} as const;

export { AuthApiPath };
