'use client'

import { SetStateAction, useEffect } from 'react'

export function useKeyEvents(
	setShiftHeld: {
		(value: SetStateAction<boolean>): void
		(arg0: boolean): void
	},
	setKeysHeld: {
		(value: SetStateAction<{ [key: string]: boolean }>): void
		(arg0: { (keysHeld: any): any; (keysHeld: any): any }): void
	},
) {
	useEffect(() => {
		function handleKeydown(e: KeyboardEvent) {
			const { key } = e
			if (key === 'Shift') setShiftHeld(true)
			setKeysHeld((keysHeld: any) => ({ ...keysHeld, [key]: true }))
		}
		function handleKeyup(e: KeyboardEvent) {
			const { key } = e
			if (key === 'Shift') {
				setShiftHeld(false)
				// ? remove instances of keys being held only because of shift key being held as well
				setKeysHeld({})
			} else {
				setKeysHeld((keysHeld: any) => ({ ...keysHeld, [key]: false }))
			}
		}
		function handleBlur() {
			setKeysHeld({})
		}
		document.addEventListener('keydown', handleKeydown)
		document.addEventListener('keyup', handleKeyup)
		window.addEventListener('blur', handleBlur)
		return () => {
			document.removeEventListener('keydown', handleKeydown)
			document.removeEventListener('keyup', handleKeyup)
			window.removeEventListener('blur', handleBlur)
		}
	}, [])
}
