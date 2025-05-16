import React from 'react';

function Question({ question, onAnswerSelect, getButtonClassName, selectedAnswerIndex }) {
  const handleAnswer = (selectedIndex) => {
    onAnswerSelect(selectedIndex);
  };

  return (
    <div>
      <h2>{question.text}</h2>
      <ul>
        {question.options.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => handleAnswer(index)}
              className={getButtonClassName(index)}
              disabled={selectedAnswerIndex !== null}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Question;