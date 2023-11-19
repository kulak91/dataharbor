import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';
import { type UserSignInRequestDto } from '~/packages/users/users.js';

import styles from './styles.module.scss';

type Props = {
  onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Props> = ({ onSubmit }) => {
  const { authDataStatus } = useAppSelector(({ auth }) => auth);

  const isLoading = authDataStatus === DataStatus.PENDING;

  const submitText = isLoading ? 'Signing..' : 'Sign In';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    void onSubmit({ email, password });
  };

  return (
    <div className={styles['container']}>
      <form onSubmit={handleFormSubmit} className={styles['form']}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e): void => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e): void => setPassword(e.target.value)}
        />
        <button type="submit">{submitText}</button>
        <span>
          Don&apos;t have an account?
          <Link to={AppRoute.SIGN_UP}>
            <span className={styles['text']}>Sign up</span>
          </Link>
        </span>
      </form>
    </div>
  );
};

export { SignInForm };
