import React from 'react';
import './Piano.css';

// Define notes for C3 to C5 (MIDI 48-72)
const notesArray = [
  { midi: 48, note: 'C3', isBlack: false },
  { midi: 49, note: 'C#3', isBlack: true },
  { midi: 50, note: 'D3', isBlack: false },
  { midi: 51, note: 'D#3', isBlack: true },
  { midi: 52, note: 'E3', isBlack: false },
  { midi: 53, note: 'F3', isBlack: false },
  { midi: 54, note: 'F#3', isBlack: true },
  { midi: 55, note: 'G3', isBlack: false },
  { midi: 56, note: 'G#3', isBlack: true },
  { midi: 57, note: 'A3', isBlack: false },
  { midi: 58, note: 'A#3', isBlack: true },
  { midi: 59, note: 'B3', isBlack: false },
  { midi: 60, note: 'C4', isBlack: false },
  { midi: 61, note: 'C#4', isBlack: true },
  { midi: 62, note: 'D4', isBlack: false },
  { midi: 63, note: 'D#4', isBlack: true },
  { midi: 64, note: 'E4', isBlack: false },
  { midi: 65, note: 'F4', isBlack: false },
  { midi: 66, note: 'F#4', isBlack: true },
  { midi: 67, note: 'G4', isBlack: false },
  { midi: 68, note: 'G#4', isBlack: true },
  { midi: 69, note: 'A4', isBlack: false },
  { midi: 70, note: 'A#4', isBlack: true },
  { midi: 71, note: 'B4', isBlack: false },
  { midi: 72, note: 'C5', isBlack: false }
];

// Create a notes object for easy lookup (e.g., notes.C4 = 60)
const notes = {};
notesArray.forEach(({ midi, note }) => {
  notes[note.replace('#', 's')] = midi; // Replace # with 's' for valid JS keys (e.g., C#4 -> Cs4)
});

/**
 * A dumb React component rendering a 25-key piano (C3 to C5) with SVG.
 * Highlights target notes, shows pressed notes, and toggles labels.
 * @param {number[]} highlightedKeys - MIDI notes to highlight in yellow (e.g., [notes.C4, notes.E4])
 * @param {number[]} pressedKeys - MIDI notes currently pressed
 * @param {boolean} showLabels - Toggle to show note names (e.g., "C3", "C#3")
 * @param {function} onClick - Callback for key press simulation (e.g., onClick(midi))
 * @param {function} onKeyPress - Callback to determine if pressed key is correct (returns true/false)
 * @param {string} positiveMatchColor - Color for correct presses (default: '#4caf50')
 * @param {string} negativeMatchColor - Color for incorrect presses (default: '#f44336')
 */
const Piano = ({
  highlightedKeys = [],
  pressedKeys = [],
  showLabels = false,
  onClick,
  onKeyPress,
  positiveMatchColor = '#4caf50', // Green
  negativeMatchColor = '#f44336'  // Red
}) => {
  // Define key dimensions
  const whiteKeyWidth = 40;
  const whiteKeyHeight = 150;
  const blackKeyWidth = 24;
  const blackKeyHeight = 100;

  // Count white keys up to a given index
  const countWhiteKeys = (upToIndex) => {
    return notesArray.slice(0, upToIndex + 1).filter(n => !n.isBlack).length;
  };

  // Count previous white keys for black key positioning
  const countPreviousWhiteKeys = (index) => {
    return countWhiteKeys(index - 1);
  };

  return (
    <div className="piano-container">
      <svg
        viewBox={`0 0 ${whiteKeyWidth * 15} ${whiteKeyHeight + 30}`}
        width="100%"
        height="100%"
      >
        {/* Render white keys first */}
        {notesArray.filter(note => !note.isBlack).map((note, index) => {
          const x = index * whiteKeyWidth;
          const isHighlighted = highlightedKeys.includes(note.midi);
          const isPressed = pressedKeys.includes(note.midi);
          let fill = 'white';
          if (isHighlighted) fill = '#ffeb3b'; // Yellow for highlights
          if (isPressed) {
            // If onKeyPress handler is provided, ask it if this press is correct
            const isCorrect = onKeyPress ? onKeyPress(note.midi) : true;
            fill = isCorrect ? positiveMatchColor : negativeMatchColor;
          }

          return (
            <g key={note.midi}>
              <rect
                x={x}
                y={0}
                width={whiteKeyWidth}
                height={whiteKeyHeight}
                fill={fill}
                stroke="black"
                strokeWidth={1}
                onClick={() => onClick && onClick(note.midi)}
              />
              {showLabels && (
                <text
                  x={x + whiteKeyWidth / 2}
                  y={whiteKeyHeight - 5}
                  textAnchor="middle"
                  fontSize="12"
                  fill="black"
                >
                  {note.note}
                </text>
              )}
            </g>
          );
        })}

        {/* Render black keys on top */}
        {notesArray.filter(note => note.isBlack).map((note, rawIndex) => {
          const index = notesArray.findIndex(n => n.midi === note.midi);
          const prevWhiteKeys = countPreviousWhiteKeys(index);
          const x = prevWhiteKeys * whiteKeyWidth - blackKeyWidth / 2;
          const isHighlighted = highlightedKeys.includes(note.midi);
          const isPressed = pressedKeys.includes(note.midi);
          let fill = 'black';
          if (isHighlighted) fill = '#ffeb3b';
          if (isPressed) {
            const isCorrect = onKeyPress ? onKeyPress(note.midi) : true;
            fill = isCorrect ? positiveMatchColor : negativeMatchColor;
          }

          return (
            <g key={note.midi}>
              <rect
                x={x}
                y={0}
                width={blackKeyWidth}
                height={blackKeyHeight}
                fill={fill}
                stroke="black"
                strokeWidth={1}
                onClick={() => onClick && onClick(note.midi)}
              />
              {showLabels && (
                <text
                  x={x + blackKeyWidth / 2}
                  y={blackKeyHeight - 5}
                  textAnchor="middle"
                  fontSize="10"
                  fill="white"
                >
                  {note.note}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export { Piano, notes, notesArray };
