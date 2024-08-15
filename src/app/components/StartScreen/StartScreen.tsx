import React from 'react';
import HandIcon from '../HandIcon/HandIcon';
import Button from '../Button/Button';
import styles from './StartScreen.module.css';

interface StartScreenProps {
  onStart: () => void;
}

function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className={styles.startScreen}>
      <div className={styles.startContent}>
        <HandIcon />
        <div className={styles.startText}>
          <h1 className={styles.startTitle}>Who wants to be a millionaire?</h1>
          <Button onClick={onStart} label="Start" />
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
