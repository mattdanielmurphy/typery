import React from 'react'
import styled from 'styled-components'
import { grey, textColor, green, backgroundColor, borderRadius } from './theme'

const keysQwerty = [
	'~` 1! 2@ 3# 4$ 5% 6^ 7& 8* 9( 0) -_ =+ BackSpace',
	'Tab q w e r t y u i o p [{ ]} \\|',
	'CapsLock a s d f g h j k l ;: \'" Enter',
	'ShiftLeft z x c v b n m ,< .> /? ShiftRight',
	'Space'
]

const keys = keysQwerty

const keySize = 60
const KeyWrapper = styled.div`
	align-items: center;
	border-radius: ${borderRadius};
	cursor: default;
	display: flex;
	flex-direction: column;
	grid-column-end: span 4;
	grid-row-end: span 2;
	grid-template-columns: repeat(2, ${`${keySize / 2}px`});
	grid-template-rows: repeat(2, ${`${keySize / 2}px`});
	justify-content: center;
	padding: 0.7em 1.4em 0.8em 1.4em;
	margin: .1em;
	font-weight: 700;
	color: ${({ isDown, isCurrent, highlightCurrentKey }) => {
		if (isCurrent && highlightCurrentKey) {
			return backgroundColor
		} else return isDown ? green : textColor
	}};
	background: ${({ isCurrent, highlightCurrentKey, isDown }) =>
		isDown ? grey : isCurrent && highlightCurrentKey ? green : 'none'};
	div {
		display: flex;
		text-align: center;
		flex-direction: column;
		justify-content: center;
	}
`

const makeKey = (key, index, options = {}) => {
	const { isDouble, isSpecial, isDown, isCurrent, highlightCurrentKey } = options
	let topKey = key
	let bottomKey

	if (isDouble) {
		bottomKey = String(key[0])
		topKey = String(key[1])
	}

	const specialKeys = {
		BackSpace: <span>&larr;</span>,
		Enter: <span style={{ fontFamily: 'Helvetica' }}>&#8629;</span>,
		ShiftLeft: 'Shift',
		ShiftRight: 'Shift',
		CapsLock: 'Caps Lock'
	}

	if (isSpecial) {
		if (specialKeys[topKey]) topKey = specialKeys[topKey]
	}

	return (
		<KeyWrapper key={index} data-key={topKey} {...options} data-alt-key={bottomKey}>
			<div>{topKey}</div>
			{bottomKey && <div>{bottomKey}</div>}
		</KeyWrapper>
	)
}

const getKey = (key, index, keysDown, currentChar, highlightCurrentKey) => {
	const isSpecial = key.length > 2
	const isDouble = key.length > 1 && !isSpecial
	const isDown = isDouble ? keysDown[key[1]] || keysDown[key[0]] : keysDown[key]
	const isCurrent = key === 'Space' ? ' ' === currentChar : key === currentChar
	return makeKey(key, index, { isSpecial, isDouble, isDown, isCurrent, highlightCurrentKey })
}

const KeyboardContainer = styled.div`
	display: flex;
	.keyboard {
		padding: 1.5em;
		background: ${grey};
		color: ${textColor};
		border-radius: ${borderRadius};
		margin: 2em auto;
		box-sizing: border-box;
	}
`

const KeyRowWrapper = styled.div`
	display: flex;
	justify-content: center;
	font-size: 1em;
`

const KeyRow = ({ keys, keysDown, currentChar, highlightCurrentKey }) => {
	const keyArray = keys.split(' ')
	return (
		<KeyRowWrapper>
			{keyArray.map((key, index) => getKey(key, index, keysDown, currentChar, highlightCurrentKey))}
		</KeyRowWrapper>
	)
}

const Keyboard = ({ keysDown, currentChar, options }) => {
	const highlightCurrentKey = options.highlightNextKey.value
	return (
		<KeyboardContainer className="keyboard-container">
			<div className="keyboard">
				{keys.map((keys, index) => (
					<KeyRow
						keys={keys}
						key={index}
						keysDown={keysDown}
						currentChar={currentChar}
						highlightCurrentKey={highlightCurrentKey}
					/>
				))}
			</div>
		</KeyboardContainer>
	)
}

export default Keyboard
