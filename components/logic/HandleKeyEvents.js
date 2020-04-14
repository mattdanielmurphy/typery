import React from 'react'
import dynamic from 'next/dynamic'

const KeyboardEventHandler = dynamic(() => import('react-keyboard-event-handler'), { ssr: false })

const HandleKeyEvents = ({ keysDown, setKeysDown, checkInput }) => {
	const handleKeyDown = (key, event) => {
		if (key === 'esc' || event.ctrlKey) console.log('esc')
		else event.preventDefault()

		setKeysDown({ ...keysDown, [key]: true })
		checkInput(key)
	}
	const handleKeyUp = (key) => {
		delete keysDown[key]
		setKeysDown({})
		setKeysDown(keysDown)
	}
	return (
		<div>
			<KeyboardEventHandler handleKeys={[ 'all' ]} handleEventType="keydown" onKeyEvent={handleKeyDown} />
			<KeyboardEventHandler handleKeys={[ 'all' ]} handleEventType="keyup" onKeyEvent={handleKeyUp} />
		</div>
	)
}

export default HandleKeyEvents
