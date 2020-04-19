import React, { Fragment as F } from 'react'
import styled from 'styled-components'
import { green, textColor, currentKeyColor } from './utils/theme'

const StyledLetter = styled.span`color: ${(p) => currentKeyColor(p)};`

const Space = styled(StyledLetter)`
	border-bottom: 2px solid ${({ isCurrent }) => (isCurrent ? green : 'transparent')};
	position: relative;
	padding: 0 .1em;
	top: -25px;
`

const Text = styled.div`
	max-width: 800px;
	padding-top: 1em;
	margin: 0 auto;
	font-size: 2.3em;
	padding-bottom: 0;
	span {
		line-height: 0.6em;
	}
`

const TextDisplay = ({ currentSentence, currentCharIndex }) => {
	const characters = currentSentence ? currentSentence.split('') : []
	return (
		<div>
			<Text>
				{characters.map((charValue, index) => {
					const char = { children: charValue, isCurrent: index === currentCharIndex }
					const isSpace = charValue === ' '
					return isSpace ? <Space key={index} {...char} /> : <StyledLetter key={index} {...char} />
				})}
			</Text>
		</div>
	)
}

export default TextDisplay
