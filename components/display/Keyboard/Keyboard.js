import React, { useEffect, useState } from "react"
import { activeKeyBackgroundColor, backgroundColor, borderRadius, green, grey, textColor } from "../../theme"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLevelDownAlt } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

const keysQwerty = [
	"~` 1! 2@ 3# 4$ 5% 6^ 7& 8* 9( 0) -_ =+ BackSpace",
	"Tab q w e r t y u i o p [{ ]} \\|",
	"CapsLock a s d f g h j k l ;: '\" Enter",
	"ShiftLeft z x c v b n m ,< .> /? ShiftRight",
	"Space",
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
	padding: 1.4em 1.4em 1.4em 1.4em;
	margin: 0em;
	font-weight: 600;
	line-height: 1;
	color: ${({ isDown, isCurrent, showHighlight }) => {
		if (isDown) return backgroundColor
		if (isCurrent && showHighlight) return backgroundColor
		return textColor
	}};
	background: ${({ isDown, isCurrent, showHighlight }) => {
		if (isDown) return activeKeyBackgroundColor
		if (isCurrent && showHighlight) return green
		return "none"
	}};
	div {
		display: flex;
		text-align: center;
		flex-direction: column;
		justify-content: center;
	}
`

const makeKey = (key, index, options = {}) => {
	const { isDouble, isSpecial, isDown, isCurrent, showHighlight } = options
	let topKey = key
	let bottomKey

	if (isDouble) {
		bottomKey = String(key[0])
		topKey = String(key[1])
	}

	const specialKeys = {
		BackSpace: <span style={{ fontFamily: "Helvetica", fontSize: "1.6em", marginTop: "-1.2em" }}>&larr;</span>,
		Enter: <span style={{ fontFamily: "Helvetica", fontSize: "1.6em", marginTop: "-1.2em" }}>&#8629;</span>,
		ShiftLeft: "Shift",
		ShiftRight: "Shift",
		CapsLock: "Caps Lock",
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

const getKey = (key, index, keysDown, currentChar, showHighlight) => {
	const isSpecial = key.length > 2
	const isDouble = key.length > 1 && !isSpecial
	const isDown = isDouble ? keysDown[key[1]] || keysDown[key[0]] : keysDown[key]
	const isCurrent = key === "Space" ? " " === currentChar : key === currentChar
	return makeKey(key, index, { isSpecial, isDouble, isDown, isCurrent, showHighlight })
}

const KeyboardContainer = styled.div`
	display: flex;
	.keyboard {
		padding: 1em;
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

const KeyRow = ({ keys, keysDown, currentChar, showHighlight }) => {
	const keyArray = keys.split(" ")
	return <KeyRowWrapper>{keyArray.map((key, index) => getKey(key, index, keysDown, currentChar, showHighlight))}</KeyRowWrapper>
}

const Keyboard = ({ keysDown, currentChar, options }) => {
	const [showHighlight, setShowHighlight] = useState(false)

	useEffect(() => {
		setShowHighlight(false)
		const timer = setTimeout(() => {
			setShowHighlight(true)
		}, 1000)
		return () => clearTimeout(timer)
	}, [currentChar])

	return (
		<KeyboardContainer className='keyboard-container'>
			<div className='keyboard'>
				{keys.map((keys, index) => (
					<KeyRow keys={keys} key={index} keysDown={keysDown} currentChar={currentChar} showHighlight={showHighlight} />
				))}
			</div>
		</KeyboardContainer>
	)
}

export default Keyboard
