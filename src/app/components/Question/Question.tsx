import React, { useState, useEffect } from 'react';
import styles from './Question.module.css';

const menuIcon = '/images/menu.svg';

interface Answer {
  id: number;
  text: string;
}

interface QuestionProps {
  question: {
    question: string;
    answers: Answer[];
    correct: number[];
  };
  onAnswer: (isCorrect: boolean) => void;
  toggleSidebar: () => void;
}

function Question({ question, onAnswer, toggleSidebar }: QuestionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [highlightedAnswer, setHighlightedAnswer] = useState<number | null>(
    null,
  );

  useEffect(() => {
    setSelectedAnswers([]);
    setSubmitted(false);
    setHighlightedAnswer(null);
  }, [question]);

  const handleAnswerClick = (id: number) => {
    if (!submitted) {
      setHighlightedAnswer(id);

      setTimeout(() => {
        const isCorrect = question.correct.includes(id);
        setSelectedAnswers((prev) => [...prev, id]);
        setHighlightedAnswer(null);

        if (selectedAnswers.length + 1 === question.correct.length
          || !isCorrect) {
          setSubmitted(true);
          setTimeout(() => {
            onAnswer(isCorrect);
          }, 1000);
        }
      }, 500);
    }
  };

  const getAnswerClassName = (id: number) => {
    if (highlightedAnswer === id) {
      return styles.select;
    }

    if (selectedAnswers.includes(id)) {
      return question.correct.includes(id) ? styles.correct : styles.wrong;
    }

    return styles.inactive;
  };

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div className={styles.answerScreen}>
      <button
        type="button"
        className={styles.menuToggle}
        onClick={toggleSidebar}
      >
        <img src={menuIcon} alt="Menu Toggle Icon" />
      </button>
      <h1 className={styles.answerScreenTitle}>{question.question}</h1>
      <div className={styles.answerContainer}>
        {question.answers.map((answer, index) => (
          <button
            key={answer.id}
            type="button"
            onClick={() => handleAnswerClick(answer.id)}
            className={`${styles.answerButton} ${getAnswerClassName(
              answer.id,
            )}`}
            disabled={submitted || highlightedAnswer !== null}
          >
            <div className={styles.answerButtonBackground} />
            <span className={styles.answerLetter}>
              {alphabet[index]}
              .
            </span>
            {' '}
            <span className={styles.answerText}>
              {answer.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
