import React, { useEffect, useState } from 'react'
import Keyboard from './Keyboard'
import TextDisplay from './TextDisplay'
import watchKeys from './logic/watchKeys'

const App = () => {
	const [ keysDown, setKeysDown ] = useState({})
	const [ keysLifted, setKeysLiftedState ] = useState({})
	const setKeysLifted = (keys, lifted = true) => {
		const newKeysLifted = keysLifted
		keys.forEach((key) => delete newKeysLifted[key])
		setKeysLiftedState(newKeysLifted)
	}

	let lastKeyDown
	let lastKeyUp

	const handleKeyUpAndDown = ({ key }, keyDown = true) => {
		const keyUp = !keyDown

		if (key === lastKeyDown) {
			if (keyUp) {
				lastKeyDown = undefined
				if (key === lastKeyUp) {
					lastKeyUp = undefined
					return
				} else {
					console.log('key up', key)
					lastKeyUp = key
				}
			}
			return
		}
		if (keyDown) {
			console.log('new key', key)
			lastKeyDown = key
		}
	}

	const addEventListeners = () => {
		document.addEventListener('keydown', handleKeyUpAndDown)
		document.addEventListener('keyup', () => handleKeyUpAndDown(event, false))
	}
	const removeEventListeners = () => {
		document.removeEventListener('keydown', handleKeyUpAndDown)
		document.removeEventListener('keyup', handleKeyUpAndDown)
	}

	useEffect(() => {
		addEventListeners()
		return removeEventListeners
	})
	return (
		<div>
			<TextDisplay />
			{/* {Object.keys(keysDown).map((keyDown) => <p>{keyDown}</p>)} */}
			<Keyboard keysDown />
		</div>
	)
}

export default App
