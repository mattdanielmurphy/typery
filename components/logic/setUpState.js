import React from 'react'
import generateText from './generateText'
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

const setUpState = (useAppState) => {
	const [ options, setOptionsState ] = useAppState(defaultOptions)
	const [ textObject, setTextObject ] = useAppState(defaultTextObject)
	const [ keysDown, setKeysDown ] = useAppState({})
	const [ keysUp, setKeysUp ] = useAppState({})

	const setText = (text) => setTextObject({ text, ...defaultTextObject })

	const setOptions = (optionsObject, reloadText = false) => {
		console.table(optionsObject)
		if (reloadText) setText(optionsObject.text)
		setOptionsState(optionsObject)
	}

	return { options, setOptions, textObject, setTextObject, keysDown, setKeysDown, keysUp, setKeysUp }
}

export { setUpState as default, defaultTextObject }
