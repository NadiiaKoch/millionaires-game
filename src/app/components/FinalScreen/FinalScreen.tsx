import React from 'react';
import HandIcon from '../HandIcon/HandIcon';
import Button from '../Button/Button';
import styles from './FinalScreen.module.css';
import formatCurrency from '../../shared/utils/formatCurrency';

interface FinalScreenProps {
  prize: number;
}

function FinalScreen({ prize }: FinalScreenProps) {
  const handleTryAgain = () => {
    window.location.reload();
  };

  return (
    <div className={styles.finalScreen}>
      <div className={styles.finalContent}>
        <HandIcon />
        <div className={styles.finalText}>
          <h2 className={styles.finalTitle}>Total score:</h2>
          <p className={styles.finalPrize}>
            {formatCurrency(prize)}
            <span> earned</span>
          </p>
          <Button onClick={handleTryAgain} label="Try again" />
        </div>
      </div>
    </div>
  );
}

export default FinalScreen;
