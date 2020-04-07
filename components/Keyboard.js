import React from 'react'
import '../styles/sass/keyboard.scss'

const keysQwerty = `${'`~ 1! 2@ 3# 4$ 5% 6^ 7& 8* 9( 0) -_ =+ (backspace) ' +
	'(tab) q w e r t y u i o p [{ ]} \\| ' +
	'(capslock) a s d f g h j k l ;: \'" (enter) ' +
	'(shift-left) z x c v b n m ,< .> /? (shift-right)'}`.split(' ')

const keys = keysQwerty

const makeKey = (keys, options = {}) => {
	let { isDouble, isSpecial, isDown } = options
	let topKey = keys
	let bottomKey
	let className = 'key'
	if (isDouble) {
		bottomKey = String(keys[0])
		topKey = String(keys[1])
	}
	const specialKeys = {
		backspace: <span>&larr;</span>,
		enter: <span>&#8629;</span>,
		'shift-left': <span>shift</span>,
		'shift-right': <span>shift</span>
	}
	if (isSpecial) {
		className += ` is-${topKey}`
		if (specialKeys[topKey]) topKey = specialKeys[topKey]
	}
	if (isDown) {
		className += ' key-down'
	}
	return (
		<div key={className + topKey} data-key={topKey} data-alt-key={bottomKey} className={className}>
			<div className="key__top">{topKey}</div>
			{bottomKey && <div className="key__bottom">{bottomKey}</div>}
		</div>
	)
}

const getKey = (key, keysDown) => {
	const isSpecial = /\(.*\)/.test(key)
	const isDouble = key.length > 1 && !isSpecial

	if (isSpecial) {
		key = key.slice(1, -1)
	}

	const isDown = isDouble ? keysDown[key[1]] || keysDown[key[0]] : keysDown[key]
	return makeKey(key, { isSpecial, isDouble, isDown })
}

const Keyboard = (keysDown) => {
	return (
		<div className="keyboard-container">
			<div className="keyboard">{keys.map((key) => getKey(key, keysDown))}</div>
		</div>
	)
}

export default Keyboard
