import React, { useEffect, useState } from 'react'
import Keyboard from './Keyboard'
import TextDisplay from './TextDisplay'
import watchKeys from './logic/watchKeys'
import checkInput from './logic/checkInput'

const defaultTextObject = {
	text: [ 'sentence 1', 'sentence 2' ],
	currentCharIndex: 0,
	currentChar: 's',
	currentSentenceIndex: 0,
	currentSentence: 'sentence 1'
}

const App = (mode = 'auto') => {
	const [ textObject, setTextObject ] = useState(defaultTextObject)
	const [ keysDown, setKeysDown ] = useState({})
	const [ keysUp, setKeysUpState ] = useState({})
	const setKeysUp = (keysUp) => {
		setKeysUpState(keysUp)
	}
	watchKeys(keysDown, setKeysDown, setKeysUp, keysUp, textObject, setTextObject, useEffect)

	// checkInput(keysUp, textObject.currentChar, advanceCursor, useEffect)

	return (
		<div>
			<TextDisplay currentSentence={textObject.currentSentence} currentCharIndex={textObject.currentCharIndex} />
			<Keyboard {...keysDown} />
		</div>
	)
}

export { App as default, defaultTextObject }
