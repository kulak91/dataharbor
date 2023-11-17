const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];

export { HttpMethod };
