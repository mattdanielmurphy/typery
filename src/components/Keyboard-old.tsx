import { Fragment, ReactElement, ReactNode, useEffect } from 'react'

import styles from '@/styles/Keyboard.module.css'

function KeyWrapper(props: {
	children?: any
	keysHeld: { [key: string]: boolean }
	value: string
	className?: any
	shiftHeld?: boolean
}) {
	const { keysHeld, value, className, shiftHeld } = props
	return (
		<div
			className={className || {}}
			style={
				keysHeld[value] ||
				keysHeld[value.toUpperCase()] ||
				(shiftHeld && value === 'shift')
					? {
							backgroundColor: '#914BDE', //? if key held down, highlight it
					  }
					: {}
			}
		>
			{props.children}
		</div>
	)
}

function Key({
	type = 'letter',
	value,
	secondaryValue,
	shiftHeld,
	keysHeld,
}: {
	type?: string
	value: string | string[]
	secondaryValue?: string
	shiftHeld?: boolean
	keysHeld: { [key: string]: boolean }
}): ReactElement {
	if (typeof value === 'object') {
		return <>{value.map((val) => Key({ value: val, shiftHeld, keysHeld }))}</>
	} else {
		if (secondaryValue) {
			if (shiftHeld === undefined)
				throw Error('shiftHeld param missing from key with secondary value')

			return (
				<KeyWrapper
					value={value}
					key={value}
					className={styles.dualValueKey}
					keysHeld={keysHeld}
				>
					{shiftHeld ? secondaryValue : value}
				</KeyWrapper>
			)
		} else {
			return (
				<KeyWrapper
					key={value}
					value={value}
					keysHeld={keysHeld}
					shiftHeld={shiftHeld}
					className={
						value === 'shift'
							? styles.shiftKey
							: value === 'caps'
							? styles.capsKey
							: type === 'modifier'
							? styles.modifierKey
							: styles.singleValueKey
					}
				>
					{value && shiftHeld && value !== 'shift'
						? value.toUpperCase()
						: value}
				</KeyWrapper>
			)
		}
	}
}
export function Keyboard({
	shiftHeld,
	keysHeld,
}: {
	shiftHeld: boolean
	keysHeld: { [key: string]: boolean }
}) {
	useEffect(() => console.log('keysheld updated', keysHeld), [keysHeld])
	const topRowLetters = 'qwertyuiop'.split('')
	const homeRowLetters = 'asdfghjkl'.split('')
	const bottomRowLetters = 'zxcvbnm'.split('')

	return (
		<div className={styles.keyboard}>
			<div className={styles.row}>
				<Key keysHeld={keysHeld} type='modifier' value='tab' />
				<Key value={topRowLetters} keysHeld={keysHeld} shiftHeld={shiftHeld} />
				<Key
					keysHeld={keysHeld}
					value='['
					secondaryValue='{'
					shiftHeld={shiftHeld}
				/>
				<Key
					keysHeld={keysHeld}
					value=']'
					secondaryValue='}'
					shiftHeld={shiftHeld}
				/>
				<Key
					keysHeld={keysHeld}
					value='\'
					secondaryValue='|'
					shiftHeld={shiftHeld}
				/>
			</div>
			<div className={styles.row}>
				<Key keysHeld={keysHeld} type='modifier' value='caps' />
				<Key value={homeRowLetters} keysHeld={keysHeld} shiftHeld={shiftHeld} />
				<Key
					keysHeld={keysHeld}
					value=';'
					secondaryValue=':'
					shiftHeld={shiftHeld}
				/>
				<Key
					keysHeld={keysHeld}
					value="'"
					secondaryValue='"'
					shiftHeld={shiftHeld}
				/>
				<Key keysHeld={keysHeld} type='modifier' value='return' />
			</div>
			<div className={styles.row}>
				<Key
					keysHeld={keysHeld}
					type='modifier'
					value='shift'
					shiftHeld={shiftHeld}
				/>
				<Key
					value={bottomRowLetters}
					keysHeld={keysHeld}
					shiftHeld={shiftHeld}
				/>
				<Key
					keysHeld={keysHeld}
					value=','
					secondaryValue='<'
					shiftHeld={shiftHeld}
				/>
				<Key
					keysHeld={keysHeld}
					value='.'
					secondaryValue='>'
					shiftHeld={shiftHeld}
				/>
				<Key
					keysHeld={keysHeld}
					value='/'
					secondaryValue='?'
					shiftHeld={shiftHeld}
				/>
				<Key
					keysHeld={keysHeld}
					type='modifier'
					value='shift'
					shiftHeld={shiftHeld}
				/>
			</div>
			<div className={styles.row}>
				<Key keysHeld={keysHeld} value=' ' />
			</div>
		</div>
	)
}
