import { type HttpMethod } from '~/libs/packages/http/libs/enums/http-method.enum.js';

type HttpOptions = {
  method: HttpMethod;
  payload: BodyInit | null;
  headers: Headers;
};

export { type HttpOptions };
