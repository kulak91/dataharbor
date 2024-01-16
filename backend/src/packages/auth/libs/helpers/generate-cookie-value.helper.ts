import type { CookieOptions } from 'express';

type CookieResponse = {
  name: string;
  value: string;
  options: CookieOptions;
};

type SetCookiePayload = {
  name: string;
  value: string;
  opts?: CookieOptions;
};

const COOKIE_EXP_DAYS = 30;

const generateCookieValue = ({
  name,
  value,
  opts = {},
}: SetCookiePayload): CookieResponse => {
  const defaultOptions = {
    expires: new Date(Date.now() + 60 * 60 * 24 * COOKIE_EXP_DAYS * 1000),
    secure: true,
    httpOnly: true,
  };

  return {
    name,
    value,
    options: {
      ...defaultOptions,
      ...opts,
    },
  };
};

export { generateCookieValue };
