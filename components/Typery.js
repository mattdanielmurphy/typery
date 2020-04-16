import React, { useState, useEffect } from 'react'
import OptionsPanel from './OptionsPanel'
import TextDisplay from './TextDisplay'
import Keyboard from './Keyboard'
import generateText from './logic/generateText'
import formatInputtedText from './logic/formatInputtedText'
import advanceCursor from './logic/advanceCursor'
import styled from 'styled-components'
import { green, borderRadius, modalBackgroundColor } from './theme'
import { transparentize } from 'polished'

const focusLetter = ''
const minLength = 3
const maxLength = 8

const text = generateText({ focusLetter, minLength, maxLength })

const defaultTextObject = {
	text,
	currentSentenceIndex: 0,
	currentSentence: text[0],
	currentCharIndex: 0,
	currentChar: text[0][0]
}

const defaultOptions = {
	highlightNextKey: { type: 'Boolean', value: false },
	skipSpace: { type: 'Boolean', value: true },
	text: { type: 'Array', value: text, scope: 'custom' } // scope is mode that this option will appear in
}

const TyperyContainer = styled.div`
	textarea {
		appearance: none;
		border: none;
		resize: none;
		position: absolute;
		width: 90%;
		left: 5%;
		background: ${modalBackgroundColor};
		border-radius: ${borderRadius};
		cursor: pointer;
		color: ${green};
		font-family: 'Baloo Bhaina 2', sans-serif;
		font-size: 4em;
		font-weight: 700;
		text-align: center;
		padding: 3.5em 0;
		${({ hasFocus }) => hasFocus && `opacity: 0; cursor: default;`};
	}
`

const Typery = ({ config }) => {
	const [ textObject, setTextObjectState ] = useState(defaultTextObject)
	const setTextObject = (object) => {
		if (object) setTextObjectState(object)
		else {
			const text = generateText({ focusLetter, minLength, maxLength })
			setTextObjectState({
				text,
				currentSentenceIndex: 0,
				currentSentence: text[0],
				currentCharIndex: 0,
				currentChar: text[0][0]
			})
		}
	}
	const setText = (text) => setTextObject({ text, ...defaultTextObject })

	const [ keysDown, setKeysDown ] = useState({})
	const [ options, setOptionsState ] = useState(defaultOptions)
	const setOptions = (optionsObject, reloadText = false) => {
		console.log({ ...options, optionsObject })
		if (reloadText) setText(optionsObject.text)
		setOptionsState({ ...options, ...optionsObject })
	}

	const [ hasFocus, setHasFocus ] = useState(false)

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
		console.log(event)
		event.target.style.cursor = 'none'
		if (keysDown[key]) return
		const { key } = event
		if (key === 'esc' || event.ctrlKey) console.log('esc')
		else event.preventDefault()

		setKeysDown({ ...keysDown, [key]: true })
		checkInput(key)
	}

	const handleKeyUp = (event) => {
		const { key } = event
		setKeysDown({ ...keysDown, [key]: false })
	}

	const [ pointerMoveTimeout, setPointerMoveTimeout ] = useState(true)

	return (
		<TyperyContainer hasFocus={hasFocus}>
			<textarea
				autoFocus
				readOnly
				rows={1}
				id="focus-area"
				onFocus={() => setHasFocus(true)}
				onBlur={() => {
					setHasFocus(false)
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
			<TextDisplay currentSentence={textObject.currentSentence} currentCharIndex={textObject.currentCharIndex} />
			<Keyboard keysDown={keysDown} currentChar={textObject.currentChar} options={options} />
			<OptionsPanel config={config} options={options} setOptions={setOptions} />
		</TyperyContainer>
	)
}

export { Typery as default }
