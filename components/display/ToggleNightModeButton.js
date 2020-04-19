import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { textColor, green } from '../theme'

const ToggleNightModeButton = (props) => {
	return (
		<Button
			onClick={(e) => {
				e.target.blur()
				props.themeToggle.toggle()
			}}
		>
			<FontAwesomeIcon icon={props.theme.mode === 'dark' ? faSun : faMoon} />
		</Button>
	)
}

const Button = styled.button`
	background: none;
	border: none;
	border-radius: 0.3em;
	box-shadow: none;
	color: ${textColor};
	cursor: pointer;
	font-size: 1.5em;
	text-transform: uppercase;
	font-weight: 700;
	padding: 0.9em 1em;
	&:hover {
		color: ${green};
	}
`

export default ToggleNightModeButton
