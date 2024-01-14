import { createAsyncThunk } from '@reduxjs/toolkit';

import { StorageKey } from '~/libs/packages/storage/storage.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type UserAuthResponseDto,
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
} from '~/packages/users/users.js';

import { name as sliceName } from './auth.slice.js';

const signUp = createAsyncThunk<
  UserAuthResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { user, token } = await authApi.signUp(registerPayload);
  await storage.set(StorageKey.TOKEN, token);

  return user;
});

const signIn = createAsyncThunk<
  UserAuthResponseDto,
  UserSignInRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-in`, async (loginPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { user, token } = await authApi.signIn(loginPayload);
  await storage.set(StorageKey.TOKEN, token);

  return user;
});

const signOut = createAsyncThunk<unknown, undefined, AsyncThunkConfig>(
  `${sliceName}/sign-out`,
  async (_, { extra }) => {
    const { storage } = extra;
    await storage.delete(StorageKey.TOKEN);
  },
);

const getAuthenticatedUser = createAsyncThunk<
  UserAuthResponseDto | null,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-authenticated-user`, async (_, { extra }) => {
  const { authApi, storage } = extra;
  const token = await storage.has(StorageKey.TOKEN);

  if (!token) {
    return null;
  }

  try {
    return await authApi.getAuthenticatedUser();
  } catch {
    await storage.delete(StorageKey.TOKEN);
    return null;
  }
});

export { getAuthenticatedUser, signIn, signOut, signUp };
