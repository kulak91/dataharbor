import 'express';

import { type UserAuthResponseDto } from '~/packages/users/users.js';

declare module 'express' {
  interface Request {
    user?: UserAuthResponseDto;
  }
}
