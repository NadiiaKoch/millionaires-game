import React from 'react';
import HandIcon from '../HandIcon/HandIcon';
import Button from '../Button/Button';
import styles from './FinalScreen.module.css';
import formatCurrency from '../../shared/utils/formatCurrency';

interface FinalScreenProps {
  prize: number;
}

function FinalScreen({ prize }: FinalScreenProps) {
  return (
    <div className={styles.finalScreen}>
      <div className={styles.finalContent}>
        <HandIcon />
        <div className={styles.finalText}>
          <h1 className={styles.finalTitle}>Total score:</h1>
          <p className={styles.finalPrize}>
            {formatCurrency(prize)}
            <span> earned</span>
          </p>
          <Button onClick={() => window.location.reload()} label="Try again" />
        </div>
      </div>
    </div>
  );
}

export default FinalScreen;
