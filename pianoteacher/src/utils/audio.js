import * as Tone from 'tone';

const synth = new Tone.Synth().toDestination();

const playNote = (midi) => {
  synth.triggerAttackRelease(Tone.Midi(midi).toFrequency(), '4n');
};

const playChord = (notes) => {
  synth.triggerAttackRelease(notes.map(note => Tone.Midi(note).toFrequency()), '4n');
};

export { playNote, playChord };
