import './App.css';
import React, { useState, useEffect } from 'react';
import Question from './components/Question';
import Result from './components/Result';
import questionsData from './questions.json';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  useEffect(() => {
    const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5).slice(0, 31);
    setQuestions(shuffledQuestions);
  }, []);

  const handleAnswerSelect = (selectedIndex) => {
    setSelectedAnswerIndex(selectedIndex);

    if (selectedIndex === questions[currentQuestionIndex].correctAnswerIndex) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      //  Delay the transition to the next question
      setTimeout(() => {
        setCurrentQuestionIndex(nextQuestionIndex);
        setSelectedAnswerIndex(null); // Reset selected answer
      }, 1000); // 1000 milliseconds = 1 second
    } else {
      setQuizEnded(true);
    }
  };

  const handleRestartQuiz = () => {
    const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5).slice(0, 31);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizEnded(false);
    setSelectedAnswerIndex(null); // Reset selected answer
  };

  const getButtonClassName = (index) => {
    let className = '';
    if (selectedAnswerIndex !== null) {
      if (index === questions[currentQuestionIndex].correctAnswerIndex) {
        className = 'correct';
      } else if (index === selectedAnswerIndex) {
        className = 'incorrect';
      }
    }
    return className;
  };

  if (questions.length === 0) {
    return <div>Caricamento domande...</div>;
  }

  return (
    <div className="App">
      <h1>Quiz - Editing e Pro Tools</h1>
      {!quizEnded ? (
        <div className="question-container">
          <Question
            question={questions[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            getButtonClassName={getButtonClassName}
            selectedAnswerIndex={selectedAnswerIndex}
          />
        </div>
      ) : (
        <div className="result-container">
          <Result
            score={score}
            totalQuestions={questions.length}
            onRestart={handleRestartQuiz}
          />
        </div>
      )}
      <p className="score-tracker">Domanda {currentQuestionIndex + 1} / {questions.length}</p>
      <p className="score-tracker">Punteggio: {score}</p>
    </div>
  );
}

export default App;