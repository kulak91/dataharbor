import { getAuthenticatedUser, signIn, signOut, signUp } from './actions.js';

const allActions = {
  signUp,
  signOut,
  signIn,
  getAuthenticatedUser,
};

export { allActions as actions };
export { reducer } from './auth.slice.js';
