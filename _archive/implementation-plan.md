# Typery Refinements Implementation Plan

## System Diagram (ASCII)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                              PAGES                                           │
│  _document.js ─────────► applies global <html>/<body> background via CSS     │
│  _app.js ─────────────────────────────────────────────────────────────────── │
│  auto.js / custom.js ─► PageContainer ─► MyThemeProvider ─► Typery          │
└──────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                         THEME CONTEXT LAYER                                  │
│  ThemeContext.js                                                             │
│   └─ Wrapper styled-div ─► NEW: injects global <style> for html/body bg     │
└──────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                           TYPERY COMPONENT                                   │
│  Typery.js                                                                   │
│   ├─ options state (persist to localStorage, including NEW options)         │
│   ├─ textObject state (persist custom content + progress to localStorage)   │
│   ├─ FocusArea.js ──────► checkInput logic (uses NEW lenientMode option)    │
│   ├─ TextDisplay.js ────► renders history + current line (STYLE UPDATES)    │
│   ├─ Keyboard ───────────────────────────────────────────────────────────── │
│   └─ OptionsPanel.js ───► textarea (FONT FIX), file upload                  │
│                            └─ NEW: Skip to sentence button                  │
└──────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                         TEXT PROCESSING LAYER                                │
│  extractText.js                                                              │
│   ├─ extractTextFromEpub ─► CALLS normalizeText                             │
│   ├─ extractTextFromPdf ──► CALLS normalizeText                             │
│   └─ extractTextFromTxt ──► CALLS normalizeText                             │
│                                                                              │
│  NEW: normalizeText.js                                                       │
│   ├─ Replace fancy quotes with ASCII equivalents                            │
│   ├─ Replace ligatures (ff, fi, fl, ffi, ffl, etc.) with individual chars   │
│   ├─ Normalize Unicode punctuation (em-dash, en-dash, ellipsis, etc.)       │
│   └─ Trim excessive whitespace                                              │
└──────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                         INPUT HANDLING LAYER                                 │
│  FocusArea.js                                                                │
│   └─ checkInput(key)                                                         │
│        ├─ IF options.lenientMode.value THEN:                                 │
│        │   ├─ Normalize incoming key for case (a == A) unless Shift held    │
│        │   └─ Skip punctuation chars if char is punctuation                  │
│        └─ Existing skip/catch-up logic remains unchanged                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## File Tree (Exact Paths)

```
/Users/matthewmurphy/projects/typery
├── components/
│   ├── display/
│   │   ├── FocusArea.js           (MODIFY)
│   │   ├── OptionsPanel.js        (MODIFY)
│   │   ├── TextDisplay.js         (MODIFY)
│   │   └── Typery/
│   │       ├── Typery.js          (MODIFY)
│   │       └── TyperyContainer.js (MODIFY)
│   ├── logic/
│   │   ├── extractText.js         (MODIFY)
│   │   └── normalizeText.js       (CREATE)
│   └── theme/
│       └── ThemeContext.js        (MODIFY)
├── pages/
│   └── _document.js               (NO CHANGE - already correct structure)
└── AG_CONTEXT.md                  (UPDATE)
```

---

## Component Specs

### 1. `components/logic/normalizeText.js` (CREATE)

**Purpose:** Normalize imported text from EPUB/PDF files to ensure all characters are typeable on a standard keyboard.

| Function                   | Inputs          | Outputs           | Description                                                     |
| -------------------------- | --------------- | ----------------- | --------------------------------------------------------------- |
| `normalizeText(rawString)` | Raw text string | Normalized string | Main entry point. Applies all normalization rules sequentially. |

**Normalization Rules (pseudocode):**
1. **Fancy Quotes → ASCII:**
   - `"` (U+201C), `"` (U+201D) → `"`
   - `'` (U+2018), `'` (U+2019) → `'`
2. **Ligatures → Individual Chars:**
   - `ﬀ` → `ff`, `ﬁ` → `fi`, `ﬂ` → `fl`, `ﬃ` → `ffi`, `ﬄ` → `ffl`
   - `Ꜳ` / `ꜳ` → `AA` / `aa`, `Æ` / `æ` → `AE` / `ae`, etc.
3. **Punctuation Normalization:**
   - `—` (em-dash) → `--`
   - `–` (en-dash) → `-`
   - `…` (ellipsis) → `...`
   - `«` / `»` (guillemets) → `"`
4. **Whitespace Normalization:**
   - Collapse multiple spaces/newlines into single space
   - Trim leading/trailing whitespace per sentence

---

### 2. `components/logic/extractText.js` (MODIFY)

**Changes:**
- Import `normalizeText` from `./normalizeText.js`
- Call `normalizeText()` on final extracted string in each of `extractTextFromTxt`, `extractTextFromPdf`, `extractTextFromEpub` before returning

**Pseudocode:**
```
FUNCTION extractTextFromEpub(file):
  rawText = ... (existing logic)
  RETURN normalizeText(rawText)
```

---

### 3. `components/theme/ThemeContext.js` (MODIFY)

**Problem:** The `Wrapper` styled-div applies a background, but `<html>` and `<body>` retain default white, visible when scrolling past content bounds.

**Solution:** Use `createGlobalStyle` from styled-components to inject global CSS for `html` and `body`:

**Pseudocode:**
```
IMPORT createGlobalStyle FROM styled-components

CONST GlobalStyle = createGlobalStyle`
  html, body {
    background-color: ${backgroundColor};
    margin: 0;
    padding: 0;
    min-height: 100%;
  }
`

// In MyThemeProvider render, add <GlobalStyle /> inside ThemeProvider
```

---

### 4. `components/display/Typery/TyperyContainer.js` (MODIFY)

**Problem:** The `textarea` (FocusArea) inherits a `font-size: 4em` from the styled rule, which is intended for the "Hover over this box to type" notice but also affects anything within that context.

**Solution:** Scope the large font-size to only apply when `hasFocus` is false (i.e., when placeholder text is shown):

**Pseudocode:**
```
textarea {
  font-size: 1rem;   // Default (normal)
  ${({ hasFocus }) => !hasFocus && `font-size: 4em; font-weight: 700; text-align: center; padding: 3.5em 0;`}
  ${({ hasFocus }) => hasFocus && `opacity: 0; cursor: default;`}
}
```

This ensures the textarea's enormous font only appears for the hover prompt.

---

### 5. `components/display/OptionsPanel.js` (MODIFY)

**Problem:** The `<TextArea>` component inside OptionsPanel has a reasonable `font-size: 1rem` defined, but it might be affected by the global textarea styles in TyperyContainer.

**Solution:** 
1. Add explicit inline `font-size` override or a more specific styled rule
2. Ensure the TextArea is styled independently

**Also:** The TextArea background should respect theme. Currently uses `${grey}` which resolves correctly, but ensure it's not being overridden.

**Pseudocode for TextArea fix:**
```
TextArea {
  font-size: 1rem !important;   // Or use higher specificity via nesting
  // ... rest unchanged
}
```

---

### 6. `components/display/TextDisplay.js` (MODIFY)

**Problem:** Current line (`Text` styled-div) has `font-size: 2.3em` while history has `font-size: 1.2rem`. There's also a large gap between history and current line.

**Solution:**
1. Reduce `Text` font-size to match `History` (1.2rem)
2. Reduce or eliminate `padding-top` / `margin-bottom` between them
3. Keep line-height consistent

**Pseudocode:**
```
CONST Text = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.2rem;      // CHANGED from 2.3em
  padding-top: 0.5em;     // CHANGED from 2em
  line-height: 1.4;       // Add for consistency
  span { line-height: 1.4; }
`

CONST History = styled.div`
  margin-bottom: 0.5em;   // CHANGED from 2em
  // ... rest unchanged
`
```

---

### 7. `components/display/Typery/Typery.js` (MODIFY)

**Problem 1:** Custom text content and progress are not persisted to localStorage.

**Solution:** 
1. Persist custom text content to localStorage under key `typery-custom-text`
2. Persist current sentence index under key `typery-custom-progress`
3. On mount, if mode is "custom", load saved text and progress

**Problem 2:** New option needed: "Lenient Mode" (non-strict uppercase + skip punctuation), enabled by default.

**Solution:** Add to `defaultOptions`:
```
lenientMode: { type: "Boolean", value: true }
```

**Problem 3:** User needs ability to skip sentences (for unwanted content at start of EPUB).

**Solution:** 
1. Add a `skipSentences` numeric option (or a "Skip to Next Sentence" button)
2. Better UX: Add a "Skip" button visible in custom mode that advances `currentSentenceIndex` without affecting WPM stats

**Pseudocode for persistence:**
```
// On mode change to "custom" or on mount:
IF options.mode.value === "custom":
  savedText = localStorage.getItem("typery-custom-text")
  savedProgress = localStorage.getItem("typery-custom-progress")
  IF savedText:
    parsedText = JSON.parse(savedText)
    parsedProgress = savedProgress ? parseInt(savedProgress) : 0
    // Initialize textObject at parsedProgress sentence

// On textObject change (when in custom mode):
IF options.mode.value === "custom":
  localStorage.setItem("typery-custom-text", JSON.stringify(textObject.text))
  localStorage.setItem("typery-custom-progress", textObject.currentSentenceIndex)
```

---

### 8. `components/display/FocusArea.js` (MODIFY)

**Problem:** User must type exact case for capitals, and punctuation from EPUBs is often un-typeable even after normalization.

**Solution:** When `lenientMode` is enabled:
1. **Case Insensitivity:** Compare lowercase versions of `key` and `currentChar`, unless Shift is held
2. **Punctuation Skipping:** If `currentChar` is punctuation and `key` matches next non-punctuation char, auto-advance past punctuation

**Pseudocode:**
```
FUNCTION checkInput(key, event):
  lenient = options.lenientMode.value
  
  // Case normalization
  IF lenient AND NOT event.shiftKey:
    key = key.toLowerCase()
    compareChar = currentChar.toLowerCase()
  ELSE:
    compareChar = currentChar
  
  // Punctuation skip check
  IF lenient AND isPunctuation(currentChar):
    // Look ahead to next non-punctuation char
    nextNonPunc = findNextNonPunctuation(currentSentence, currentCharIndex)
    IF key.toLowerCase() === nextNonPunc.char.toLowerCase():
      advanceCursor to nextNonPunc.index, mark skipped as "auto-skipped"
      RETURN
  
  // ... rest of existing logic with compareChar instead of currentChar
```

**Helper Functions (in normalizeText.js or inline):**
```
FUNCTION isPunctuation(char):
  RETURN regex test for: [.,;:!?'"()[\]{}<>—–-…«»]
  
FUNCTION findNextNonPunctuation(sentence, startIndex):
  FOR i FROM startIndex TO sentence.length:
    IF NOT isPunctuation(sentence[i]):
      RETURN { char: sentence[i], index: i }
  RETURN null
```

---

### 9. `components/display/OptionsPanel.js` - Add Skip Button (ADDITIONAL MODIFY)

**Purpose:** Allow user to skip unwanted sentences (e.g., repeated title in EPUB).

**Changes:**
1. Add "Skip Sentence" button visible when mode is "custom"
2. Button calls a new `skipSentence` function passed from Typery.js

**Pseudocode:**
```
// In OptionsPanel render, when mode === "custom":
<Button onClick={skipCurrentSentence}>Skip Sentence (→)</Button>

// skipCurrentSentence is a prop passed from Typery.js
```

**In Typery.js:**
```
FUNCTION skipCurrentSentence():
  IF textObject.currentSentenceIndex < textObject.text.length - 1:
    SET textObject.currentSentenceIndex += 1
    // Reset char index, etc.
    // Do NOT update WPM stats
```

---

## Verification Steps

### 1. Font Size Fix (Issue #1)
- [ ] Navigate to Options panel in custom mode
- [ ] Verify textarea font size is reasonable (~16px)
- [ ] Verify "Hover over this box to type" notice still displays large when focus is lost on FocusArea

### 2. Persistence (Issue #2)
- [ ] Upload an EPUB/PDF or paste custom text
- [ ] Type a few sentences to make progress
- [ ] Refresh the page
- [ ] Verify text content is restored
- [ ] Verify progress (current sentence index) is restored
- [ ] Verify can resume typing from where left off

### 3. Background Color (Issue #3)
- [ ] Switch to dark mode (or verify system is in dark mode)
- [ ] Scroll to very top/bottom of page (overscroll)
- [ ] Verify no white flash/background visible
- [ ] Verify entire page including html/body is themed

### 4. Current Line Styling (Issue #4)
- [ ] Enter custom mode with multi-sentence text
- [ ] Type through a few sentences to build history
- [ ] Verify current line font size matches history lines
- [ ] Verify minimal vertical gap between history and current line
- [ ] Verify text wraps at similar width

### 5. Lenient Mode Option (Issue #5)
- [ ] Verify new "Lenient Mode" toggle appears in Options
- [ ] Verify it is ON by default
- [ ] When ON: type lowercase for uppercase letters → should advance
- [ ] When ON: punctuation auto-skips when typing next word
- [ ] When OFF: exact case required, punctuation must be typed

### 6. Text Normalization (Issue #6)
- [ ] Upload an EPUB with "fancy" quotes (e.g., Kindle format book)
- [ ] Verify quotes display as standard `"` and `'`
- [ ] Verify no ligatures (e.g., "ffi" in "griffin" should be 3 separate chars)
- [ ] Verify em-dashes become `--`, en-dashes become `-`
- [ ] Verify ellipses become `...`

### 7. Skip Sentence (Issue #6a)
- [ ] Upload EPUB that starts with repeated title
- [ ] Click "Skip Sentence" button to skip past unwanted intro content
- [ ] Verify progress continues from new sentence
- [ ] Verify skipped sentences don't affect WPM calculations

---

## Summary of Changes by File

| File                                           | Action                                          | Priority |
| ---------------------------------------------- | ----------------------------------------------- | -------- |
| `components/logic/normalizeText.js`            | CREATE                                          | High     |
| `components/logic/extractText.js`              | MODIFY (add normalizeText calls)                | High     |
| `components/theme/ThemeContext.js`             | MODIFY (add createGlobalStyle)                  | Medium   |
| `components/display/Typery/TyperyContainer.js` | MODIFY (conditional font-size)                  | Medium   |
| `components/display/TextDisplay.js`            | MODIFY (font-size, spacing)                     | Medium   |
| `components/display/Typery/Typery.js`          | MODIFY (persistence, lenientMode, skipSentence) | High     |
| `components/display/FocusArea.js`              | MODIFY (lenient input matching)                 | High     |
| `components/display/OptionsPanel.js`           | MODIFY (skip button, textarea font)             | Medium   |
| `AG_CONTEXT.md`                                | UPDATE (document new features)                  | Low      |

---

## Implementation Order

1. **normalizeText.js** - Create utility first (no dependencies)
2. **extractText.js** - Integrate normalization
3. **ThemeContext.js** - Fix background bleeding
4. **TyperyContainer.js** - Fix textarea font inheritance
5. **OptionsPanel.js** - Fix textarea styling, add skip button
6. **TextDisplay.js** - Align current line with history
7. **Typery.js** - Add lenientMode option, persistence, skipSentence handler
8. **FocusArea.js** - Implement lenient input matching
9. **AG_CONTEXT.md** - Document changes
