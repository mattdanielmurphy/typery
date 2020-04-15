import React from 'react'
import dynamic from 'next/dynamic'

const KeyboardEventHandler = dynamic(() => import('react-keyboard-event-handler'), { ssr: false })

const HandleKeyEvents = ({ keysDown, setKeysDown, checkInput }) => {
	console.log({ keysDown })

	const hasFocus = () => document.activeElement.id === 'focus-area'

	return (
		<div>
			<KeyboardEventHandler
				handleKeys={[ 'all' ]}
				// handleFocusableElements
				handleEventType="keydown"
				onKeyEvent={handleKeyDown}
			/>
			<KeyboardEventHandler
				handleKeys={[ 'all' ]}
				// handleFocusableElements
				handleEventType="keyup"
				onKeyEvent={handleKeyUp}
			/>
		</div>
	)
}

export default HandleKeyEvents
