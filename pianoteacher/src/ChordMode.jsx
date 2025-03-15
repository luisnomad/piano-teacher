import React, { useState, useEffect } from 'react';
import { Piano } from './components/Piano';
import { playChord } from './utils/audio';
import { chords } from './utils/theory';

const ChordMode = ({ onExit }) => {
  const [stage, setStage] = useState(1);
  const [attempts, setAttempts] = useState(5);
  const [targetChord, setTargetChord] = useState(null);
  const [pressedKeys, setPressedKeys] = useState([]);
  const [lastPressCorrect, setLastPressCorrect] = useState(null);
  const [showLabels, setShowLabels] = useState(false);

  useEffect(() => {
    const randomChord = chords[stage - 1][Math.floor(Math.random() * chords[stage - 1].length)];
    setTargetChord(randomChord);
  }, [stage]);

  const handleKeyPress = (midi) => {
    const isCorrect = targetChord.notes.includes(midi);
    setLastPressCorrect(isCorrect);
    setPressedKeys([...pressedKeys, midi]);

    if (isCorrect) {
      const remainingNotes = targetChord.notes.filter(note => !pressedKeys.includes(note));
      if (remainingNotes.length === 0) {
        playChord(targetChord.notes); // Play the chord when all notes are correctly pressed
        setAttempts(attempts - 1);
        setPressedKeys([]);
        setLastPressCorrect(null);
        if (attempts === 1) {
          setStage(stage + 1);
          setAttempts(5);
        }
      }
    } else {
      setPressedKeys([]);
      setLastPressCorrect(null);
    }
  };

  const checkKeyPress = () => {
    if (lastPressCorrect === null) return false;
    return lastPressCorrect;
  };

  return (
    <div>
      <button onClick={onExit}>Exit Mode</button>
      <button onClick={() => setShowLabels(!showLabels)}>
        {showLabels ? 'Hide Labels' : 'Show Labels'}
      </button>
      {targetChord && (
        <Piano
          highlightedKeys={targetChord.notes}
          pressedKeys={pressedKeys}
          showLabels={showLabels}
          onClick={handleKeyPress}
          onKeyPress={checkKeyPress}
          positiveMatchColor="#00CC00"
          negativeMatchColor="#ff0000"
        />
      )}
      {!targetChord && <p>Loading chord...</p>}
      <p>Stage {stage}: Play the chord {targetChord ? targetChord.name : '...'}</p>
      <p>Attempts left: {attempts}</p>
    </div>
  );
};

export default ChordMode;
