import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  onClick: () => void;
  label: string;
}

function Button({ onClick, label }: ButtonProps) {
  return (
    <button type="button" onClick={onClick} className={styles.button}>
      {label}
    </button>
  );
}

export default Button;
