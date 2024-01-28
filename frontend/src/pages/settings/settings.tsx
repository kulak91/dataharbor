import type { FC } from 'react';

import styles from './styles.module.scss';

const Settings: FC = () => {
  return (
    <div>
      <h1 className={styles['title']}>Settings Screen </h1>
    </div>
  );
};

export { Settings };
