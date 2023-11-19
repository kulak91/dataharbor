import type { FC } from 'react';

import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Props = {
  isOverflow?: boolean;
};

const Loader: FC<Props> = ({ isOverflow = false }) => {
  return (
    <div
      className={getValidClassNames(
        styles['container'],
        isOverflow && styles['overflow'],
      )}
    >
      <div className={styles['loader']}>
        <div />
        <div />
      </div>
    </div>
  );
};

export { Loader };
