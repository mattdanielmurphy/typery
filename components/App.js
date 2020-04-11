import React, { useState, useEffect } from 'react'
import Options from './Options'
import HandleKeyEvents from './logic/HandleKeyEvents'
import TextDisplay from './TextDisplay'
import Keyboard from './Keyboard'
import generateText from './logic/generateText'
import formatInputtedText from './logic/formatInputtedText'
import advanceCursor from './logic/advanceCursor'

const text = generateText({ focusLetter: 'a' })

const defaultTextObject = {
	text,
	currentSentenceIndex: 0,
	currentSentence: text[0],
	currentCharIndex: 0,
	currentChar: text[0][0]
}

const defaultOptions = {
	highlightNextKey: true,
	text
}

const App = ({ config }) => {
	const [ textObject, setTextObject ] = useState(defaultTextObject)
	const [ keysDown, setKeysDown ] = useState({})

	const [ options, setOptionsState ] = useState(defaultOptions)

	const checkInput = (key) => {
		if (key === 'space') key = ' '
		if (key === textObject.currentChar) {
			advanceCursor(textObject, setTextObject)
		}
	}

	const setText = (text) => setTextObject({ text, ...defaultTextObject })

	const setOptions = (optionsObject, reloadText = false) => {
		if (reloadText) setText(optionsObject.text)
		setOptionsState(optionsObject)
	}

	return (
		<div>
			<TextDisplay currentSentence={textObject.currentSentence} currentCharIndex={textObject.currentCharIndex} />
			<Keyboard keysDown={keysDown} currentChar={textObject.currentChar} />
			{/* <Options config={config} options={options} setOptions={setOptions} /> */}

			<HandleKeyEvents keysDown={keysDown} setKeysDown={setKeysDown} checkInput={checkInput} />
		</div>
	)
}

export { App as default }
