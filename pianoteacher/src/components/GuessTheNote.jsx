import React from 'react';

function GuessTheNote({ targetNote, setTargetNote, feedback }) {

  return (
    <div>
      <h2>Guess the Note</h2>
      <p>{feedback}</p>
    </div>
  );
}

export default GuessTheNote;
