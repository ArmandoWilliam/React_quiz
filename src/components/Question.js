import React from 'react';

function Question({ question, onAnswerSelect }) {
  const handleAnswer = (selectedIndex) => {
    onAnswerSelect(selectedIndex);
  };

  return (
    <div>
      <h2>{question.text}</h2>
      <ul>
        {question.options.map((option, index) => (
          <li key={index}>
            <button onClick={() => handleAnswer(index)}>{option}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Question;