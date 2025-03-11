// src/utils/midi.js
function setupMIDI(setPressedKeys) {
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess()
      .then(midiAccess => {
        const inputs = midiAccess.inputs.values();
        for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
          input.value.onmidimessage = handleMIDIMessage;
        }

        function handleMIDIMessage(message) {
          const [command, note, velocity] = message.data;
          if (command === 144 && velocity > 0) {
            // Note on
            setPressedKeys(prevPressedKeys => [...prevPressedKeys, note]);
          } else if (command === 128 || velocity === 0) {
            // Note off
            setPressedKeys(prevPressedKeys => prevPressedKeys.filter(n => n !== note));
          }
        }
      })
      .catch(() => {
        console.log("MIDI access denied or unavailable.");
      });
  } else {
    console.log("Web MIDI API is not supported in this browser.");
  }
}

export default setupMIDI;
