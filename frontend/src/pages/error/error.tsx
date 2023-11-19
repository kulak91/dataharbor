import { type FC, useEffect, useState } from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/app-route.enum';

import type { RouterError } from './libs/types/types';
import styles from './styles.module.scss';

const SECONDS_TO_REDIRECT = 6;

const ErrorPage: FC = () => {
  const error = useRouteError() as RouterError;
  const navigate = useNavigate();
  const [count, setCount] = useState(SECONDS_TO_REDIRECT);

  useEffect(() => {
    const interval = setInterval(() => setCount((prev) => prev - 1), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (count < 1) {
      navigate(AppRoute.ROOT);
    }
  }, [count]);

  return (
    <div className={styles['container']} id="error-page">
      <h1>Oops!</h1>
      <h2 className={styles['subtitle']}>
        {error.status} <i>{error.statusText || error.message}</i>
      </h2>
      <p>{error.data}</p>
      <Link to={AppRoute.ROOT}>Go back to home</Link>
      <p className={styles['subscript']}>
        You will be redirected in{' '}
        <strong className={styles['enhanced']}>{count}</strong> second
        {count === 1 ? '' : 's'}
      </p>
    </div>
  );
};

export { ErrorPage };
