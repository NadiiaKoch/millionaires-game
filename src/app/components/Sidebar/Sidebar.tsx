import React from 'react';
import Image from 'next/image';
import styles from './Sidebar.module.css';
import questionsData from '../../../data/questions.json';
import formatCurrency from '../../shared/utils/formatCurrency';

const closeIcon = '/images/close.svg';

interface SidebarProps {
  currentQuestionIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({
  currentQuestionIndex,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <button type="button" className={styles.closeSidebar} onClick={onClose}>
        <Image width={24} height={24} src={closeIcon} alt="Close Sidebar" />
      </button>
      <ul className={styles.sidebarList}>
        {questionsData.questions.map((question, index) => {
          let state = styles.inactive;
          if (index === currentQuestionIndex) {
            state = styles.hover;
          } else if (index < currentQuestionIndex) {
            state = `${styles.inactive} ${styles.gray}`;
          }
          return (
            <li key={question.id} className={`${styles.prizeBlock} ${state}`}>
              <div className={styles.prizeBackground} />
              <span className={styles.text}>
                {formatCurrency(question.prize)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
