import { type HttpMethod } from '~/libs/packages/http/http.js';

type WhiteRoute = {
  path: string;
  methods: HttpMethod[];
};

export { type WhiteRoute };
