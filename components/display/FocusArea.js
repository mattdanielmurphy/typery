import React, { useState } from 'react'
import advanceCursor from '../logic/advanceCursor'

export const FocusArea = ({ hasFocus, setHasFocus, keysDown, setKeysDown, textObject, setTextObject, options }) => {
	const [ pointerMoveTimeout, setPointerMoveTimeout ] = useState(true)

	const checkInput = (key) => {
		const nextChar = textObject.currentSentence[textObject.currentCharIndex + 1]
		if (key === 'space') key = ' '
		if (key === textObject.currentChar) {
			if (options.skipSpace.value === true && nextChar === ' ') {
				advanceCursor(textObject, setTextObject, { advanceTwice: true })
			} else {
				advanceCursor(textObject, setTextObject)
			}
		}
	}

	const handleKeyDown = (event) => {
		event.target.style.cursor = 'none'
		if (keysDown[key] || key === 'esc' || event.ctrlKey) return
		event.preventDefault()
		const { key } = event
		setKeysDown({ ...keysDown, [key]: true })
		checkInput(key)
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
			id="focus-area"
			onFocus={() => setHasFocus(true)}
			onBlur={() => {
				setTimeout(() => {
					if (document.activeElement.id !== 'focus-area') {
						setKeysDown({})
						setHasFocus(false)
					}
				}, 300)
			}}
			onKeyDown={(event) => (hasFocus ? handleKeyDown(event) : '')}
			onKeyUp={handleKeyUp}
			onMouseEnter={(e) => {
				if (hasFocus) return
				e.target.style.cursor = 'none'
				e.target.focus()
				setPointerMoveTimeout(e.target)
				setTimeout(() => setPointerMoveTimeout(), 200)
			}}
			onPointerMove={(e) => {
				if (pointerMoveTimeout) return
				else if (e.target.style.cursor) e.target.style.cursor = 'default'
			}}
			value={hasFocus ? '' : 'Hover over this box to type.'}
		/>
	)
}
