import React, { useState, useEffect } from 'react'
import OptionsPanel from './OptionsPanel'
import HandleKeyEvents from './logic/HandleKeyEvents'
import TextDisplay from './TextDisplay'
import Keyboard from './Keyboard'
import generateText from './logic/generateText'
import formatInputtedText from './logic/formatInputtedText'
import advanceCursor from './logic/advanceCursor'
import styled from 'styled-components'
import '../styles/sass/keyboard.scss'

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
	highlightNextKey: { _default: false, type: 'Boolean', value: false },
	skipSpace: { _default: true, type: 'Boolean', value: true },
	text: { _default: text, type: 'Array', value: text, scope: 'custom' }
}

const Typer = ({ config }) => {
	const [ textObject, setTextObjectState ] = useState(defaultTextObject)
	const [ keysDown, setKeysDown ] = useState({})

	const [ options, setOptionsState ] = useState(defaultOptions)

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
	const checkInput = (key) => {
		const nextChar = textObject.currentSentence[textObject.currentCharIndex + 1]

		if (key === 'space') key = ' '
		if (key === textObject.currentChar) {
			if (options.skipSpace.value === true && nextChar === ' ') {
				console.log('skip space', options)
				advanceCursor(textObject, setTextObject, { advanceTwice: true })
			} else {
				advanceCursor(textObject, setTextObject)
			}
		}
	}

	const setText = (text) => setTextObject({ text, ...defaultTextObject })

	const setOptions = (optionsObject, reloadText = false) => {
		console.log({ ...options, optionsObject })
		if (reloadText) setText(optionsObject.text)
		setOptionsState({ ...options, ...optionsObject })
	}

	return (
		<div>
			<TextDisplay currentSentence={textObject.currentSentence} currentCharIndex={textObject.currentCharIndex} />
			<Keyboard keysDown={keysDown} currentChar={textObject.currentChar} options={options} />
			<OptionsPanel config={config} options={options} setOptions={setOptions} />

			<HandleKeyEvents keysDown={keysDown} setKeysDown={setKeysDown} checkInput={checkInput} />
		</div>
	)
}

export { Typer as default }
