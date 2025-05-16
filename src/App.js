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

  useEffect(() => {
    const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5).slice(0, 31);
    setQuestions(shuffledQuestions);
  }, []);

  const handleAnswerSelect = (selectedIndex) => {
    if (selectedIndex === questions[currentQuestionIndex].correctAnswerIndex) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
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
  };

  if (questions.length === 0) {
    return <div>Caricamento domande...</div>;
  }

  return (
    <div className="App">
      <h1>Quiz EPT</h1>
      {!quizEnded ? (
        <div className="question-container">
          <Question
            question={questions[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
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