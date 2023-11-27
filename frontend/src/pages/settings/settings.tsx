import type { FC } from 'react';

import styles from './styles.module.scss';

const Settings: FC = () => {
  const handleClick = async (): Promise<void> => {
    try {
      const res = await fetch('http://localhost:3001/api/v1/users/test', {
        method: 'GET',
      });
      console.log('res', await res.json());
    } catch (error) {
      console.log('err', error);
    }
  };

  return (
    <div>
      <h1 className={styles['title']}>Settings Screen </h1>

      <button onClick={handleClick}>Click</button>
    </div>
  );
};

export { Settings };
