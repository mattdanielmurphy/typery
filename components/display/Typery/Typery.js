import React, { useState, useEffect } from 'react'
import { TextDisplay, OptionsPanel, Keyboard, FocusArea } from '..'
import generateText from '../../logic/generateText'
import formatInputtedText from '../../logic/formatInputtedText'
import { TyperyContainer } from './TyperyContainer'
import { useTheme } from '../../theme'

const focusLetter = ''
const minLength = 3
const maxLength = 8

const defaultTextObject = (text = generateText({ focusLetter, minLength, maxLength })) => ({
	text,
	currentSentenceIndex: 0,
	currentSentence: text[0],
	currentCharIndex: 0,
	currentChar: text[0][0]
})

const defaultOptions = (text) => ({
	highlightNextKey: { type: 'Boolean', value: false },
	skipSpace: { type: 'Boolean', value: true },
	darkMode: { type: 'Boolean', value: true },
	text: { type: 'Array', value: text, scope: 'custom' } // scope is mode that this option will appear in
})

const Typery = ({ config, theme }) => {
	const themeToggle = useTheme()
	const toggleDarkMode = () => themeToggle.toggle()

	const [ textObject, setTextObjectState ] = useState(defaultTextObject())
	const setTextObject = (object) => {
		if (object) setTextObjectState(object)
		else {
			const text = generateText({ focusLetter, minLength, maxLength })
			setTextObjectState(defaultTextObject())
		}
	}
	const setText = (text) => setTextObject({ text, ...defaultTextObject })

	const [ keysDown, setKeysDown ] = useState({})
	const [ options, setOptionsState ] = useState(defaultOptions(textObject.text))
	const setOptions = (optionsObject, reloadText = false) => {
		if (optionsObject.darkMode !== options.darkMode) toggleDarkMode()
		if (reloadText) setText(optionsObject.text)
		setOptionsState({ ...options, ...optionsObject })
	}

	const [ hasFocus, setHasFocus ] = useState(false)

	// add and remove listener for window
	// useState(() => {
	// 	window.addEventListener('blur', (e) => {})
	// 	return () => {
	// 		window.removeEventListener('blur', (e) => {})
	// 	}
	// }, [])

	const focusAreaProps = { setHasFocus, keysDown, setKeysDown, textObject, setTextObject, options, hasFocus }

	return (
		<TyperyContainer hasFocus={hasFocus}>
			<FocusArea {...focusAreaProps} />
			<TextDisplay currentSentence={textObject.currentSentence} currentCharIndex={textObject.currentCharIndex} />
			<Keyboard keysDown={keysDown} currentChar={textObject.currentChar} options={options} />
			<OptionsPanel config={config} options={options} setOptions={setOptions} />
		</TyperyContainer>
	)
}

export { Typery as default }
