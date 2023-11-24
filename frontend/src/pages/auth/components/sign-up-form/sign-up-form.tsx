import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';
import { type UserSignUpRequestDto } from '~/packages/users/users.js';

import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
  const { authDataStatus } = useAppSelector(({ auth }) => auth);

  const isLoading = authDataStatus === DataStatus.PENDING;

  const submitText = isLoading ? 'Signing..' : 'Sign Up';

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
          Already have an account?
          <Link to={AppRoute.SIGN_IN}>
            <span className={styles['text']}>Sign in</span>
          </Link>
        </span>
      </form>
    </div>
  );
};

export { SignUpForm };
