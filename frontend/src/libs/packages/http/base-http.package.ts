import { type Http, type HttpOptions } from './libs/types/types.js';

class BaseHttp implements Http {
  public load(path: string, options: HttpOptions): Promise<Response> {
    const { method, payload, headers } = options;

    return fetch(path, {
      method,
      headers,
      body: payload,
    });
  }
}

export { BaseHttp };
