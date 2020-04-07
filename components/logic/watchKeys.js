import React from 'react'
import checkInput from './checkInput'

function watchKeys(keysDown, setKeysDown, setKeysUp, keysUp, textObject, setTextObject, useEffect) {
	const setKeyDown = (key) => {
		checkInput(key, textObject, setTextObject)
		setKeysDown({ [key]: true, ...keysDown })
	}
	const setKeyUp = (key) => {
		const newKeysDown = keysDown
		delete newKeysDown[key]
		setKeysDown(newKeysDown)
		setKeysUp({ key })
	}

	const handleKeyUpAndDown = (event, keyDown = true) => {
		const { key } = event
		if (keyDown) {
			if (keysDown[key]) return
			else setKeyDown(key)
		} else if (keysDown[key]) setKeyUp(key)
	}

	const addEventListeners = () => {
		document.addEventListener('keydown', handleKeyUpAndDown)
		document.addEventListener('keyup', (event) => handleKeyUpAndDown(event, false))
	}

	const removeEventListeners = () => {
		document.removeEventListener('keydown', handleKeyUpAndDown)
		document.removeEventListener('keyup', handleKeyUpAndDown)
	}

	useEffect(
		() => {
			addEventListeners()
			return removeEventListeners
		},
		[ keysDown, keysUp ]
	)
}

export default watchKeys
