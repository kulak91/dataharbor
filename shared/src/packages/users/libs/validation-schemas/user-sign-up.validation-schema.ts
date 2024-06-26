import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserSignUpRequestDto } from '../types/types.js';

const userSignUp = joi.object<UserSignUpRequestDto, true>({
  email: joi
    .string()
    .trim()
    .email({
      tlds: {
        allow: false,
      },
    })
    .required()
    .messages({
      'any.required': UserValidationMessage.EMAIL_REQUIRED,
      'string.empty': UserValidationMessage.EMAIL_REQUIRED,
      'string.email': UserValidationMessage.EMAIL_WRONG,
    }),
  password: joi.string().trim().required().min(2).messages({
    'any.required': UserValidationMessage.PASSWORD_REQUIRED,
    'string.empty': UserValidationMessage.PASSWORD_REQUIRED,
    'sting.min': UserValidationMessage.PASSWORD_MIN_LENGTH,
  }),
  firstName: joi.string().trim().required(),
  lastName: joi.string().trim().required(),
});

export { userSignUp };
