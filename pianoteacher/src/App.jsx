import React, { useState, useEffect } from 'react';
import { Piano } from './components/Piano';
import GuessTheNote from './components/GuessTheNote';
import ChordMode from './components/ChordMode';
import './App.css';
import theory from './utils/theory';
import { playNote } from './utils/audio';
import setupMIDI from './utils/midi';

function App() {
  const [mode, setMode] = useState(null);
  const [targetNote, setTargetNote] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [pressedKeys, setPressedKeys] = useState([]);

  useEffect(() => {
    if (mode === 'guessNote' && !targetNote) {
      const newNote = theory.getRandomNote();
      setTargetNote(newNote);
      playNote(newNote);
      setFeedback(''); // Clear feedback on new note
    }
  }, [mode, targetNote]);

  useEffect(() => {
    setupMIDI(setPressedKeys);
  }, []);

  const handleKeyPress = (midi) => {
    if (mode === 'guessNote') {
      playNote(midi); // Play the pressed note

      // Check if the pressed key is correct
      if (midi === targetNote) {
        // Correct!
        setFeedback('Correct!');
        setTimeout(() => {
          // Get a new random note
          const newNote = theory.getRandomNote();
          setTargetNote(newNote);
          playNote(newNote);
        }, 1000);
      } else {
        // Incorrect
        setFeedback('Try again!');
        setTimeout(() => {
          playNote(targetNote); // Re-play the target note after 1 second
        }, 1000);
      }
    }
  };

  const pianoOnClick = (midi) => {
    if (mode === 'guessNote') {
      handleKeyPress(midi);
    }
  }

  return (
    <div className="App">
      <h1>Piano Teacher</h1>
      {!mode ? (
        <div>
          <button onClick={() => setMode('guessNote')}>Guess the Note</button>
          <button onClick={() => setMode('chordMode')}>Chord Mode</button>
        </div>
      ) : mode === 'guessNote' ? (
        <GuessTheNote targetNote={targetNote} setTargetNote={setTargetNote} feedback={feedback} />
      ) : (
        <ChordMode />
      )}
      <Piano 
        highlightedKeys={[targetNote]}
        pressedKeys={pressedKeys}
        onClick={pianoOnClick}
      />
    </div>
  );
}

export default App;
