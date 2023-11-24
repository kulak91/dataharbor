import { BaseHttp } from './base-http.package.js';

const http = new BaseHttp();

export { http };
export { HttpCode, HttpHeader, HttpMethod } from './libs/enums/enums.js';
export { AuthError, HttpError } from './libs/exceptions/exceptions.js';
export { type Http } from './libs/types/types.js';
export { type HttpOptions } from './libs/types/types.js';
