const HttpCode = {
  OK: 200,
  CREATED: 201,
  UNPROCESSED_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  BAD_REQUEST: 400
} as const;

export { HttpCode };
