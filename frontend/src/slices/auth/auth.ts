import {
  getAuthenticatedUser,
  refreshToken,
  signIn,
  signOut,
  signUp,
} from './actions.js';

const allActions = {
  signUp,
  signOut,
  signIn,
  getAuthenticatedUser,
  refreshToken,
};

export { allActions as actions };
export { reducer } from './auth.slice.js';
