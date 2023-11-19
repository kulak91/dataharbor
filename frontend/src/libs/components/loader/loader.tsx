import type { FC } from 'react';

import styles from './styles.module.scss';

const Loader: FC = () => {
  const { loader } = styles;

  return (
    <div className={loader}>
      <div />
      <div />
    </div>
  );
};

export { Loader };
