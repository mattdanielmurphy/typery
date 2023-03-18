import { useEffect, useState } from 'react'

import styles from '@/styles/Keyboard.module.css'

function Key({
	value,
	keysHeld,
	className,
}: {
	value: string
	keysHeld: { [key: string]: boolean }
	className?: any
}) {
	return (
		<div
			className={className || styles.standardKey}
			style={{
				background: keysHeld[value] ? '#321a4c' : '#0d0d0d', //? if key held down, highlight it
				color: /[a-zA-Z]/.test(value) ? '#aaa' : '#444',
			}}
		>
			{value}
		</div>
	)
}
export function Keyboard({
	shiftHeld,
	keysHeld,
}: {
	shiftHeld: boolean
	keysHeld: { [key: string]: boolean }
}) {
	useEffect(() => console.log('keysheld updated', keysHeld), [keysHeld])
	//? define keys
	const keys = ['`1234567890-=', 'qwertyuiop[]\\', "asdfghjkl;'", 'zxcvbnm,./']
	const shiftedKeys = [
		'~!@#$%^&*()_+',
		'QWERTYUIOP{}|',
		'ASDFGHJKL:"',
		'ZXCVBNM<>?',
	]

	//? Change set of keys to shiftedKeys when shift is held
	const [keySet, setKeySet] = useState(keys)
	useEffect(() => {
		if (shiftHeld) setKeySet(shiftedKeys)
		else setKeySet(keys)
	}, [shiftHeld])

	return (
		<div className={styles.keyboard}>
			<div className={styles.row}>
				{keySet[0].split('').map((key) => (
					<Key key={key} value={key} keysHeld={keysHeld} />
				))}
				<div className={styles.delete}>delete</div>
			</div>
			<div className={styles.row}>
				<div className={styles.tab}>tab</div>
				{keySet[1].split('').map((key) => (
					<Key key={key} value={key} keysHeld={keysHeld} />
				))}
			</div>
			<div className={styles.row}>
				<div className={styles.capsLock}>caps</div>
				{keySet[2].split('').map((key) => (
					<Key key={key} value={key} keysHeld={keysHeld} />
				))}
				<div className={styles.return}>return</div>
			</div>
			<div className={styles.row}>
				<div className={styles.shift}>shift</div>
				{keySet[3].split('').map((key) => (
					<Key key={key} value={key} keysHeld={keysHeld} />
				))}
				<div className={styles.shift}>shift</div>
			</div>
			<div className={styles.row}>
				<div className={styles.spacer}></div>
				<Key keysHeld={keysHeld} value=' ' className={styles.space} />
				<div className={styles.spacer}></div>
			</div>
		</div>
	)
}
