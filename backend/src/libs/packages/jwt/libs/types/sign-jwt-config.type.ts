type SignJWTConfig = {
  alg: string;
  issuer: string;
  exp: number | string | Date;
};

export { type SignJWTConfig };
