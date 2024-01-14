import { ApiPath } from '~/libs/enums/enums.js';
import { HttpMethod } from '~/libs/packages/http/http.js';
import { AuthApiPath } from '~/packages/auth/auth.js';

import type { WhiteRoute } from '../types/white-route.type.js';

const WHITE_ROUTES: WhiteRoute[] = [
  {
    path: `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
    methods: [HttpMethod.POST],
  },
  {
    path: `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
    methods: [HttpMethod.POST],
  },
];

export { WHITE_ROUTES };
