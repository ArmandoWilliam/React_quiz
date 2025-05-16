import React from 'react';

function Result({ score, totalQuestions, onRestart }) {
  return (
    <div className="result-container">
      <h2>Risultato Finale</h2>
      <p>Hai totalizzato {score} risposte corrette su {totalQuestions}.</p>
      <button onClick={onRestart}>Rigioca</button>
    </div>
  );
}

export default Result;