'use client';

import React, { useState } from 'react';
import StartScreen from './components/StartScreen/StartScreen';
import Question from './components/Question/Question';
import FinalScreen from './components/FinalScreen/FinalScreen';
import questionsData from '../data/questions.json';
import Sidebar from './components/Sidebar/Sidebar';
import styles from './page.module.css';

export default function HomePage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleStart = () => {
    setGameStarted(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      if (currentQuestionIndex < questionsData.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsGameOver(true);
      }
    } else {
      setIsGameOver(true);
    }
  };

  const prizeAmount = isGameOver && currentQuestionIndex > 0
    ? Number(questionsData.questions[currentQuestionIndex - 1].prize)
    : 0;

  let content;

  if (!gameStarted) {
    content = <StartScreen onStart={handleStart} />;
  } else if (isGameOver) {
    content = <FinalScreen prize={prizeAmount} />;
  } else {
    content = (
      <div className={styles.main}>
        <Sidebar
          currentQuestionIndex={currentQuestionIndex}
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
        />
        <Question
          question={questionsData.questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          toggleSidebar={toggleSidebar}
        />
      </div>
    );
  }

  return <div>{content}</div>;
}
