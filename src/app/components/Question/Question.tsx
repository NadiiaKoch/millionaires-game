import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Question.module.css';

const menuIcon = '/images/menu.svg';
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F'];

interface Answer {
  id: number;
  text: string;
}

interface SingleQuestion {
  question: string;
  answers: Answer[];
  correct: number[];
}

interface QuestionProps {
  question: SingleQuestion;
  onAnswer: (isCorrect: boolean) => void;
  toggleSidebar: () => void;
}

function Question({ question, onAnswer, toggleSidebar }: QuestionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [highlightedAnswer, setHighlightedAnswer] = useState<number | null>(
    null,
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSelectedAnswers([]);
    setSubmitted(false);
    setHighlightedAnswer(null);
  }, [question]);

  const handleAnswerClick = (id: number) => {
    if (submitted) {
      return;
    }
    setHighlightedAnswer(id);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const isCorrect = question.correct.includes(id);
      setSelectedAnswers((prev) => [...prev, id]);
      setHighlightedAnswer(null);

      if (selectedAnswers.length + 1 === question.correct.length
        || !isCorrect) {
        setSubmitted(true);
        timeoutRef.current = setTimeout(() => {
          onAnswer(isCorrect);
        }, 1000);
      }
    }, 500);
  };

  const handleClick = (id: number) => () => handleAnswerClick(id);

  const getAnswerClassName = (id: number) => {
    if (highlightedAnswer === id) {
      return styles.select;
    }
    if (selectedAnswers.includes(id)) {
      if (question.correct.includes(id)) {
        return styles.correct;
      }
      return styles.wrong;
    }
    if (submitted && question.correct.includes(id)) {
      return styles.correct;
    }
    return styles.inactive;
  };

  return (
    <div className={styles.answerScreen}>
      <button
        type="button"
        className={styles.menuToggle}
        onClick={toggleSidebar}
      >
        <Image width={24} height={24} src={menuIcon} alt="Menu Toggle Icon" />
      </button>
      <h2 className={styles.answerScreenTitle}>{question.question}</h2>
      <div className={styles.answerContainer}>
        {question.answers.map((answer, index) => (
          <button
            key={answer.id}
            type="button"
            onClick={handleClick(answer.id)}
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
