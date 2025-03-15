import React, { useState, useEffect } from 'react';
import GuessTheNote from './GuessTheNote';
import ChordMode from './ChordMode';
import './components/Piano.css';
import * as Tone from 'tone';

const App = () => {
  const [mode, setMode] = useState(null);

  useEffect(() => {
    if (mode) {
      Tone.start();
      console.log('AudioContext started');
    }
  }, [mode]);

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
  };

  const handleExitMode = () => {
    setMode(null);
  };

  return (
    <div>
      {!mode ? (
        <div>
          <h1>Piano Teacher</h1>
          <button onClick={() => handleModeSelect('guessTheNote')}>Guess the Note</button>
          <button onClick={() => handleModeSelect('chordMode')}>Chord Mode</button>
        </div>
      ) : mode === 'guessTheNote' ? (
        <GuessTheNote onExit={handleExitMode} />
      ) : mode === 'chordMode' ? (
        <ChordMode onExit={handleExitMode} />
      ) : null}
    </div>
  );
};

export default App;
