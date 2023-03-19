'use client'

import { Keyboard } from '@/components/Keyboard'
import { TextToType } from '@/components/TextToType'
import { handleKeyEvents } from '../utils/handleKeyEvents'
import { useState } from 'react'

export function Typery() {
	const text = 'some sentence of words'
	//? Handle keypresses
	const [shiftHeld, setShiftHeld] = useState(false)
	const [keysHeld, setKeysHeld] = useState<{ [key: string]: boolean }>({})
	const [textIndex, setTextIndex] = useState(0)

	handleKeyEvents(setShiftHeld, setKeysHeld)

	//! TYPING PROGRESS
	const [remainingString, setRemainingString] = useState(text)

	return (
		<div>
			<TextToType text={text} />
			<Keyboard shiftHeld={shiftHeld} keysHeld={keysHeld} />
		</div>
	)
}
