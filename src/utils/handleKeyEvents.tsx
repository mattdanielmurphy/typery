'use client'

import { SetStateAction, useEffect } from 'react'

export function handleKeyEvents(
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

			const modifierKeyHeld = e.ctrlKey || e.altKey || e.metaKey
			if (modifierKeyHeld) return //? so browser keyboard shortcuts still work
			//? else:
			e.preventDefault()

			if (key === 'Shift') setShiftHeld(true)
			setKeysHeld((keysHeld: any) => ({ ...keysHeld, [key]: true }))
		}
		function handleKeyup(e: KeyboardEvent) {
			const { key } = e

			const modifierKeyHeld = e.ctrlKey || e.altKey || e.metaKey
			if (modifierKeyHeld) return //? so browser keyboard shortcuts still work
			//? else:
			e.preventDefault()

			if (key === 'Shift') {
				setShiftHeld(false)
				// ? remove instances of keys being held when changing case
				// should change how values are stored--whether shift is being held shouldn't change the key name of the key
				// this works just fine however
				setKeysHeld({})
			} else {
				setKeysHeld((keysHeld: any) => {
					const newKeysHeld = { ...keysHeld }
					delete newKeysHeld[key]
					return newKeysHeld
				})
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
