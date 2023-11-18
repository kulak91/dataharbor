const UserValidationMessage = {
  EMAIL_REQUIRED: 'Email is required.',
  EMAIL_WRONG: 'Email is wrong.',
  PASSWORD_REQUIRED: 'Password is required.',
  PASSWORD_MIN_LENGTH: 'Password must have at least 2 characters.'
} as const;

export { UserValidationMessage };
