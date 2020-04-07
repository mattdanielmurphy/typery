import React, { useEffect, useState } from 'react'
import Keyboard from './Keyboard'
import TextDisplay from './TextDisplay'
import watchKeys from './logic/watchKeys'
import generateText from './logic/generateText'
import Options from './Options'

// generateText is passed an alphabet object with different key weights

const text = generateText({})

const defaultTextObject = {
	text,
	currentCharIndex: 0,
	currentChar: text[0][0],
	currentSentenceIndex: 0,
	currentSentence: text[0]
}

const defaultOptions = {
	highlightNextKey: true,
	text
}

const App = (mode = 'auto') => {
	const [ options, setOptionsState ] = useState(defaultOptions)
	const [ textObject, setTextObject ] = useState(defaultTextObject)
	const [ keysDown, setKeysDown ] = useState({})
	const [ keysUp, setKeysUp ] = useState({})
	const setText = (text) => setTextObject({ text, ...defaultTextObject })
	const setOptions = (optionsObject, reloadText = false) => {
		if (reloadText) setText(optionsObject.text)
		setOptionsState(optionsObject)
	}
	watchKeys(keysDown, setKeysDown, setKeysUp, keysUp, textObject, setTextObject, useEffect)

	return (
		<div>
			<TextDisplay currentSentence={textObject.currentSentence} currentCharIndex={textObject.currentCharIndex} />
			<Keyboard {...keysDown} />
			<Options {...options} {...setOptions} />
		</div>
	)
}

export { App as default, defaultTextObject }
