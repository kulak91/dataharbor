const UserColumnName = {
  ID: 'id',
  EMAIL: 'email',
  PASSWORD_HASH: 'password_hash',
  PASSWORD_SALT: 'password_salt',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
} as const;

export { UserColumnName };
