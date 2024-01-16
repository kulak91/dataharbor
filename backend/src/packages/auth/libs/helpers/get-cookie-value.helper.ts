const getCookieValue = ({
  cookie,
  key,
}: {
  cookie?: string;
  key: string;
}): string | null => {
  if (!cookie) {
    return null;
  }

  const cookies = cookie.split(';');

  for (cookie of cookies) {
    const cookiePair = cookie.trim().split('=');

    if (cookiePair[0] === key) {
      return cookiePair[1] ?? null;
    }
  }

  return null;
};

export { getCookieValue };
