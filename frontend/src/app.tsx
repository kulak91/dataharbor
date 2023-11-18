import './main.css';

import { type FC, useState } from 'react';

import { useAppDispatch } from '~/libs/hooks/hooks.js';
import { actions as authActions } from '~/slices/auth/auth.js';

const App: FC = () => {
  const dispatch = useAppDispatch();

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // State for the sign up form
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const handleRegister = (): void => {
    void dispatch(
      authActions.signUp({ email: signUpEmail, password: signUpPassword }),
    );
  };

  const handleSignIn = (): void => {
    void dispatch(
      authActions.signIn({ email: signInEmail, password: signInPassword }),
    );
  };

  // Handle sign in submit
  const handleSignInSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Logic to handle sign in
    console.log('Sign In:', signInEmail, signInPassword);
    handleSignIn();
  };

  // Handle sign up submit
  const handleSignUpSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Logic to handle sign up
    console.log('Sign Up:', signUpEmail, signUpPassword);
    handleRegister();
  };

  return (
    <>
      <div className="container">
        <div className="form-container">
          <div className="form-box">
            <form onSubmit={handleSignInSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={signInEmail}
                onChange={(e): void => setSignInEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={signInPassword}
                onChange={(e): void => setSignInPassword(e.target.value)}
              />
              <button type="submit">Sign In</button>
            </form>
            <p>
              New to us?{' '}
              <a className="form-link" href="#">
                Register
              </a>
            </p>
          </div>
          <div className="form-box">
            <form onSubmit={handleSignUpSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={signUpEmail}
                onChange={(e): void => setSignUpEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={(e): void => setSignUpPassword(e.target.value)}
              />
              <button type="submit">Sign Up</button>
            </form>
            <p>
              Already have an account?{' '}
              <a className="form-link" href="#">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export { App };
