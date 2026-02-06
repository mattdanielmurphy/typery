# Typery Context

A web-based typing tutor/game built with Next.js and Styled Components.

## Core Logic
- `components/logic/generateText.js`: Generates random sentences or words. Now supports configurable `sentenceLength`.
- `components/logic/advanceCursor.js`: Handles moving the cursor and finishing sentences. Includes WPM and Average WPM calculation.
- `components/display/FocusArea.js`: Captures keystrokes, starts timer, and manages focus. Updated to preserve system keyboard shortcuts (Cmd/Alt/Ctrl).

## State Management
- `Typery.js` holds the `textObject` and `options` state. Features localStorage persistence for settings (excluding random text).

## Recently Added Features
- Custom Text Mode: Users can paste text or upload TXT, PDF, and EPUB files to type from.
  - Persistent Storage: Custom text and progress (current sentence index) are saved to localStorage and restored on reload.
  - Text Normalization: Imported text is automatically cleaned (handling fancy quotes, ligatures, em-dashes, ellipses, etc.).
  - Skip Sentence: Option in custom mode to skip past unwanted sentences (e.g., long intros).
- Sentence History: Previous sentences appear above the current one, allowing users to scroll and re-read.
- WPM tracking: Moved to below the keyboard for a cleaner typing area.
- Options: Configurable mode (Random vs Custom).
  - Lenient Mode (ON by default): Non-strict uppercase matching and automatic punctuation skipping when typing the next word.
- Keyboard: Highlight next letter after 1s delay. Inverted key colors on press for prominence.
- System-synced Dark Mode: Automatically matches OS appearance.
  - Fixed: Theme background now applies to the entire HTML document via `GlobalStyle` to prevent white bleed.
- UI tweaks: Standardized spacing and refined typography. Current line font size in `TextDisplay` now matches history for a seamless look.


## Conventions
- Use `pnpm` for package management.
- Styled components are often defined in companion files or as part of the main display component.
- ESM imports/exports are preferred.
- Standard formulas: WPM = `(characters / 5) / minutes`.
- PDF Parsing: Uses `pdfjs-dist/legacy/build/pdf` to maintain compatibility with Webpack 4 (shipped with Next.js 10).
