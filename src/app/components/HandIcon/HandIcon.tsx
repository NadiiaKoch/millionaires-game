import React from 'react';
import styles from './HandIcon.module.css';

const handIcon = '/images/hand.svg';

function HandIcon() {
  return <img src={handIcon} alt="Hand Icon" className={styles.handIcon} />;
}

export default HandIcon;
