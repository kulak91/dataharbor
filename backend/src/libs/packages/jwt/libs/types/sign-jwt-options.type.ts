type SignJWTOptions = {
  exp?: string;
  claim: Record<string, number | string>;
};

export { type SignJWTOptions };
