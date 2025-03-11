# PianoTeacher: An Open-Source Music Learning App

Welcome to the PianoTeacher project—a React-based web application designed to teach music theory through interactive gameplay using a 25-key virtual piano (C3 to C5, MIDI 48-72). This repo is NOT the completed app, it's a mega-prompt for your AI model to build it! This repo contains all the specifications needed to build and customize your own version of the app, whether you're using Cursor, Replit, Lovable, etc, (or manual development). Keep reading if you're interested! 

## The Idea

I've created this repo as a playground for developers and AI enthusiasts! By sharing it on X, I invite anyone with access to different AI models (e.g., Cursor, ChatGPT, Claude, Grok, Replit, v0, Bolt, Lovable, etc) or coding tools to clone it, and build their own versions of PianoTeacher by using the `mainprompt.xml`. Share your results on X with the hashtag `#PianoTeacherChallenge`—let's see the diverse creations this sparks! We can also see which models are able to complete the App! I have spent hours debugging the prompt, it has EVERYTHING it needs to run. One important limitation (on purpose): this app can work with a MIDI controller or the mouse. You'd think, but why? Why don't we just use our QWERTY keyboards! Good question! I deliverately left that part out, so you can optionally add it to the prompt. But you can play one of the game modes entirely with the mouse, if you don't want to go further!

## Project Overview

PianoTeacher features two modes:

*   **Guess the Note:** A practice mode where users identify random notes (C3-C5) indefinitely, with audio feedback via Tone.js and visual cues on the piano.
*   **Chord Mode:** A progressive mode with 6 stages (e.g., building chords, inversions, progressions), advancing after 5 correct attempts per stage, with a visual indicator of progress.

The app uses Vite for setup, Web MIDI API for input, Tone.js for audio, and a custom SVG-based Piano component. All resources are provided in the root folder to avoid conflicts with Vite's `src/` creation.

## Materials Included

All files are located in the root directory of this repository. After setting up Vite, copy `Piano.js` and `Piano.css` to `src/components/` for use in the app, keeping the originals intact.

*   **Prompts:**
    *   `mainprompt.xml`: The main mega-prompt with app requirements, Vite setup instructions, features (MIDI, Tone.js, UI), and implementation guidance. Includes MIDI error handling and clarifies `onClick` usage for the Piano component.
    *   `gamerules.xml`: Defines gameplay rules for "Guess the Note" (indefinite mode) and "Chord Mode" (6 stages with 5-attempt progression), including evaluation and feedback logic.
    *   `MusicData.xml`: Contains specific chords (e.g., C Major: C4-E4-G4, MIDI 60-64-67) and progressions (e.g., I-IV-V-I) with MIDI numbers and note names.
    *   `MusicData.json`: A JSON version of `MusicData.xml` for direct JavaScript use, offering the same data with flexibility.
    *   `rootprompt.xml`: Guides the AI through a structured process: understand requirements, plan, ask questions, then implement. Points to all resources and ensures clarity before coding.
*   **Example Files:**
    *   `Piano.jsx`: A React component rendering a 25-key piano with SVG, exporting `notes` and `notesArray` for note lookups. Uses `onClick(midiNote)` for key presses, with correctness handled by parent components.
    *   `Piano.css`: CSS styling for the piano, ensuring responsiveness and clean visuals.
    *   `gameEngine.js`: An example implementation of the game logic, structuring exercises and evaluations for each mode and stage.

## Getting Started

Follow these steps to build your own version of PianoTeacher:

1.  **Set Up the Project**

    Clone the repo, and instruct your model to follow the instructions in `rootprompt.xml`.

2.  **Implement the App**

    Follow the `rootprompt.xml` process:

    *   Understand the requirements using `mainprompt.xml`, `gamerules.xml`, and `MusicData.xml`/`json`.
    *   Create a detailed plan (e.g., file structure, component breakdown, game logic).
    *   Ask questions if unclear (e.g., "Should I use a specific Vite version?").
    *   Implement *only* after resolving questions.
    *   Use `gameEngine.js` as a reference for structuring the game logic.
    *   Align with `gamerules.xml` for mode/stage rules and `MusicData.json` for exercises.

3.  **Test Your Version**

    Run `npm run dev` and test:

    *   "Guess the Note" mode for indefinite note guessing.
    *   "Chord Mode" for stage progression (5 correct attempts to advance).
    *   MIDI support (if available) with fallback to clicking the piano.
    *   UI elements (mode selection, stage/attempt indicator, exit button).
    *   Chords/progression accuracy (e.g., C Major should highlight MIDI 60-64-67).

    Share your results on X with `#PianoTeacherChallenge`!

## License

This project is open-source under the MIT License. Feel free to use, modify, and distribute it—credit is appreciated!

## Contact

Share your progress or questions on X: @luisnomad

Let's build a community around `#PianoTeacherChallenge`!
