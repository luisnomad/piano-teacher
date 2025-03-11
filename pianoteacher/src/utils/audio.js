// src/utils/audio.js
import * as Tone from 'tone'

const synth = new Tone.Synth().toDestination();
let lastStartTime = 0;

function playNote(midiNote) {
  // Convert MIDI note number to note name (e.g., 60 -> C4)
  const noteName = Tone.Frequency(midiNote, "midi").toNote();
  const now = Tone.now();
  // Ensure start time is strictly greater than previous start time
  const startTime = Math.max(now, lastStartTime + 0.1);
  synth.triggerAttackRelease(noteName, "8n", startTime);
  lastStartTime = startTime;
}

function playChord(midiNotes) {
  const chordNotes = midiNotes.map(midiNote => Tone.Frequency(midiNote, "midi").toNote());
  synth.triggerAttackRelease(chordNotes, "8n");
}

export { playNote, playChord };
