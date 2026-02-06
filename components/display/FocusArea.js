import React, { useState } from "react"
import { findNextNonPunctuation, isPunctuation } from "../logic/normalizeText"

import advanceCursor from "../logic/advanceCursor"

export const FocusArea = ({ hasFocus, setHasFocus, keysDown, setKeysDown, textObject, setTextObject, options }) => {
	const [pointerMoveTimeout, setPointerMoveTimeout] = useState(true)

	const checkInput = (key, shiftKey) => {
		if (key === "space") key = " "
		const { currentChar, currentCharIndex, currentSentence, pendingBuffer } = textObject
		const skipPuncEnabled = options.skipPunctuationAndIgnoreCapitalLetters.value

		// 1. Case Normalization
		let compareChar = currentChar
		let inputKey = key
		if (skipPuncEnabled && !shiftKey) {
			compareChar = (currentChar || "").toLowerCase()
			inputKey = (key || "").toLowerCase()
		}

		const lookAheadIndex = currentCharIndex + pendingBuffer.length + 1
		const lookAheadChar = currentSentence[lookAheadIndex]

		const isLookAheadMatch = skipPuncEnabled && !shiftKey ? inputKey === (lookAheadChar || "").toLowerCase() : key === lookAheadChar
		const isCurrentCharMatch = inputKey === compareChar

		// Decide if this is a skip-step or a fix-step
		// If it matches lookahead, we favor lookahead if we've already started skipping
		const isSkipStep = isLookAheadMatch && (pendingBuffer.length > 0 || !isCurrentCharMatch)

		if (isSkipStep) {
			let updatedTextObject = textObject
			if (!textObject.startTime) {
				updatedTextObject = { ...textObject, startTime: Date.now() }
			}
			const newBuffer = [...pendingBuffer, key]
			if (newBuffer.length >= 3) {
				// User has typed 3 chars past the error: commit the skip
				advanceCursor(updatedTextObject, setTextObject, { n: newBuffer.length + 1, missed: true }, options)
			} else {
				setTextObject({ ...updatedTextObject, pendingBuffer: newBuffer })
			}
		} else if (isCurrentCharMatch) {
			let updatedTextObject = textObject
			if (!textObject.startTime) {
				updatedTextObject = { ...textObject, startTime: Date.now() }
			}
			// Scenario 2b: User fixed their mistake or typed correctly in sequence
			const nextChar = currentSentence[currentCharIndex + 1]
			if (pendingBuffer.length === 0 && options.skipSpace.value === true && nextChar === " ") {
				advanceCursor(updatedTextObject, setTextObject, { n: 2 }, options)
			} else {
				advanceCursor(updatedTextObject, setTextObject, { n: 1 }, options)
			}
		}
	}

	const handleKeyDown = (event) => {
		const { key, shiftKey } = event
		event.target.style.cursor = "none"
		if (keysDown[key] || key === "Escape" || event.ctrlKey || event.metaKey || event.altKey) return
		event.preventDefault()
		setKeysDown({ ...keysDown, [key]: true })
		checkInput(key, shiftKey)
	}

	const handleKeyUp = (event) => {
		const { key } = event
		setKeysDown({ ...keysDown, [key]: false })
	}

	return (
		<textarea
			autoFocus
			readOnly
			rows={1}
			id='focus-area'
			onFocus={() => setHasFocus(true)}
			onBlur={() => {
				setTimeout(() => {
					if (document.activeElement.id !== "focus-area") {
						setKeysDown({})
						setHasFocus(false)
					}
				}, 300)
			}}
			onKeyDown={(event) => (hasFocus ? handleKeyDown(event) : "")}
			onKeyUp={handleKeyUp}
			onMouseEnter={(e) => {
				if (hasFocus) return
				e.target.style.cursor = "none"
				e.target.focus()
				setPointerMoveTimeout(e.target)
				setTimeout(() => setPointerMoveTimeout(), 200)
			}}
			onPointerMove={(e) => {
				if (pointerMoveTimeout) return
				else if (e.target.style.cursor) e.target.style.cursor = "default"
			}}
			value={hasFocus ? "" : "Hover over this box to type."}
		/>
	)
}
