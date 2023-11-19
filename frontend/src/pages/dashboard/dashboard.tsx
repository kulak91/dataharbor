import type { FC } from 'react';

import styles from './styles.module.scss';

const Dashboard: FC = () => {
  return (
    <div>
      <h1 className={styles['title']}>Dashboard Screen</h1>
    </div>
  );
};

export { Dashboard };
