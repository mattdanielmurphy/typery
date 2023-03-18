'use client'

import { Keyboard } from '@/components/Keyboard'
import { TextToType } from '@/components/TextToType'
import { useKeyEvents } from '../hooks/useKeyEvents'
import { useState } from 'react'

export function Typery() {
	const text = 'some sentence of words'
	//? Handle keypresses
	const [shiftHeld, setShiftHeld] = useState(false)
	const [keysHeld, setKeysHeld] = useState<{ [key: string]: boolean }>({})
	useKeyEvents(setShiftHeld, setKeysHeld)

	return (
		<div>
			<TextToType text={text} />
			<Keyboard shiftHeld={shiftHeld} keysHeld={keysHeld} />
		</div>
	)
}
