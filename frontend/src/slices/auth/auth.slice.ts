import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { getAuthenticatedUser, signIn, signOut, signUp } from './actions.js';

type State = {
  authenticatedUser: UserAuthResponseDto | null;
  authenticatedUserDataStatus: DataStatus;
  authDataStatus: DataStatus;
};

const initialState: State = {
  authenticatedUser: null,
  authenticatedUserDataStatus: DataStatus.IDLE,
  authDataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'auth',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signUp.pending, (state) => {
      state.authDataStatus = DataStatus.PENDING;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.authenticatedUser = action.payload;
      state.authDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.authenticatedUser = null;
      state.authDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(signIn.pending, (state) => {
      state.authDataStatus = DataStatus.PENDING;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.authenticatedUser = action.payload;
      state.authDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.authenticatedUser = null;
      state.authDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(signOut.pending, (state) => {
      state.authDataStatus = DataStatus.PENDING;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.authenticatedUser = null;
      state.authDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(signOut.rejected, (state) => {
      state.authDataStatus = DataStatus.REJECTED;
    });
    builder.addCase(getAuthenticatedUser.pending, (state) => {
      state.authenticatedUserDataStatus = DataStatus.PENDING;
    });
    builder.addCase(getAuthenticatedUser.fulfilled, (state, action) => {
      state.authenticatedUser = action.payload;
      state.authenticatedUserDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getAuthenticatedUser.rejected, (state) => {
      state.authenticatedUserDataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
