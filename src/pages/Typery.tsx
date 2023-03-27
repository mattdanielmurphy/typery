'use client'

import { useEffect, useState } from 'react'

import { IGNORE_CASE } from '@/constants'
import { Keyboard } from '@/components/Keyboard'
import { TextToType } from '@/components/TextToType'
import { handleKeyEvents } from '../utils/handleKeyEvents'

function generateSentence() {
	return 'sentence of words'
}

export function Typery() {
	//* STATE

	//? Keys

	const [shiftHeld, setShiftHeld] = useState(false)
	const [keysHeld, setKeysHeld] = useState<{ [key: string]: boolean }>({})

	//? Text
	const [text, setText] = useState('')
	const [textIndex, setTextIndex] = useState(0)

	//* LOGIC

	handleKeyEvents(setShiftHeld, setKeysHeld)

	//? WHAT MUST OCCUR
	//? - highlight current letter in TextToType
	//? - when a letter is typed, check if it's correct
	useEffect(() => {
		if (!text) return
		const keyToBePressed = text[textIndex]
		const correctKeyPressed = keysHeld[keyToBePressed]
		const variantOfCorrectKeyPressed =
			keysHeld[keyToBePressed.toLowerCase()] ||
			keysHeld[keyToBePressed.toUpperCase()]

		//? if IGNORE_CASE enabled, check for lowercase & uppercase variants NOTE: will not work for symbol keys
		if (correctKeyPressed || (IGNORE_CASE && variantOfCorrectKeyPressed)) {
			//? correct key was pressed
			const finalIndex = text.length - 1
			if (textIndex < finalIndex) incrementTextIndex()
			else setTextToNewSentence()
		}
	}, [keysHeld])
	//? - when first loaded, generate a new sentence to Type
	useEffect(() => {
		setTextToNewSentence()
	}, [])
	function setTextToNewSentence() {
		setTextIndex(0)
		setText(generateSentence())
	}

	//? - when sentence typed, show results
	//? - you can type again after the results are shown
	//?
	//? FUNCTIONS
	//? - increment index
	//? -
	//? -
	//? -
	//? -
	//? -
	function incrementTextIndex() {
		setTextIndex(textIndex + 1)
	}

	return (
		<div>
			<TextToType text={text} textIndex={textIndex} />
			<Keyboard shiftHeld={shiftHeld} keysHeld={keysHeld} />
		</div>
	)
}
