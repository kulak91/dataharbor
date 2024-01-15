const ExceptionMessage = {
  INVALID_TOKEN: 'Token is invalid.',
  UNAUTHORIZED_USER: 'User is not authorized.',
  USER_NOT_FOUND: 'User with these credentials was not found.',
  INCORRECT_CREDENTIALS: 'Incorrect credentials.',
  USER_ALREADY_EXISTS: 'User already exists.',
  GENERIC: "Whoops, that's an error.",
  JWT_EXPIRED: 'ERR_JWT_EXPIRED',
} as const;

export { ExceptionMessage };
