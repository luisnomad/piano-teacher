import React, { useState, useEffect } from 'react';
import { Piano, notesArray } from './components/Piano';
import { playNote } from './utils/audio';

const GuessTheNote = ({ onExit }) => {
  const [targetNote, setTargetNote] = useState(null);
  const [pressedKeys, setPressedKeys] = useState([]);
  const [lastPressCorrect, setLastPressCorrect] = useState(null);
  const [showLabels, setShowLabels] = useState(false);

  useEffect(() => {
    const randomNote = notesArray[Math.floor(Math.random() * notesArray.length)].midi;
    setTargetNote(randomNote);
  }, []);

  const handleKeyPress = (midi) => {
    const isCorrect = midi === targetNote;
    setLastPressCorrect(isCorrect);
    setPressedKeys([midi]);

    playNote(midi); // Play the note that was pressed

    if (isCorrect) {
      const randomNote = notesArray[Math.floor(Math.random() * notesArray.length)].midi;
      setTargetNote(randomNote);
    }
  };

  const checkKeyPress = () => {
    if (lastPressCorrect === null) return false;
    return lastPressCorrect;
  };

  const playTargetNote = () => {
    playNote(targetNote);
  };

  const resetState = () => {
    setPressedKeys([]);
    setLastPressCorrect(null);
  };

  return (
    <div>
      <button onClick={onExit}>Exit Mode</button>
      <button onClick={() => setShowLabels(!showLabels)}>
        {showLabels ? 'Hide Labels' : 'Show Labels'}
      </button>
      <Piano
        highlightedKeys={[targetNote]}
        pressedKeys={pressedKeys}
        showLabels={showLabels}
        onClick={handleKeyPress}
        onKeyPress={checkKeyPress}
        positiveMatchColor="#00CC00"
        negativeMatchColor="#ff0000"
      />
      <p>Guess the note (highlighted in yellow)! Click a key to try.</p>
      {!lastPressCorrect && lastPressCorrect !== null && (
        <button onClick={playTargetNote}>Play Target Note</button>
      )}
      {lastPressCorrect !== null && (
        <button onClick={resetState}>Next Note</button>
      )}
    </div>
  );
};

export default GuessTheNote;
