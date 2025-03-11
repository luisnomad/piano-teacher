// src/utils/theory.js
import { notes } from '../components/Piano';

const chords = {
  "C major": [notes.C4, notes.E4, notes.G4],
  "G major": [notes.G4, notes.B4, notes.D5],
  "F major": [notes.F4, notes.A4, notes.C5],
  "A minor": [notes.A4, notes.C5, notes.E5],
  "D minor": [notes.D4, notes.F4, notes.A4],
  "E minor": [notes.E4, notes.G4, notes.B4],
  "C Major 7th": [notes.C4, notes.E4, notes.G4, notes.B4],
  "G Major 7th": [notes.G4, notes.B4, notes.D5, notes.Fs5],
  "F Major 7th": [notes.F4, notes.A4, notes.C5, notes.E5],
  "C Minor 7th": [notes.C4, notes.Eb4, notes.G4, notes.Bb4],
  "G Dominant 7th": [notes.G4, notes.B4, notes.D5, notes.F5],
  "C Augmented": [notes.C4, notes.E4, notes.Gs4],
};

const progressions = {
  "I-IV-V-I (C Major)": [chords["C major"], chords["F major"], chords["G major"], chords["C major"]],
  "I-vi-ii-V (C Major)": [chords["C major"], chords["A minor"], chords["D minor"], chords["G major"]],
  "I-vi-IV-V (C Major)": [chords["C major"], chords["A minor"], chords["F major"], chords["G major"]],
  "ii-V-I (C Major)": [chords["D minor"], chords["G major"], chords["C major"]],
};

function getRandomNote() {
  const notesArray = Object.values(notes);
  const randomIndex = Math.floor(Math.random() * notesArray.length);
  return notesArray[randomIndex];
}

function getChord(chordName) {
  return chords[chordName];
}

export default { chords, progressions, getRandomNote, getChord };
