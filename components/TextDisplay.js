import React from 'react'
import styled from 'styled-components'
import { green } from './theme'

const CurrentLetter = styled.span`color: ${green};`
const CurrentSpace = styled.span`border-bottom: 2px solid ${green};`

const Text = styled.div`
	max-width: 800px;
	padding-top: 1em;
	margin: 0 auto;
	font-size: 2.3em;
`

const TextDisplay = ({ currentSentence, currentCharIndex }) => {
	const characters = currentSentence ? currentSentence.split('') : []
	return (
		<div>
			<Text>
				{characters.map((char, index) => {
					if (index === currentCharIndex) {
						if (char === ' ') return <CurrentSpace key={index}> </CurrentSpace>
						else return <CurrentLetter key={index}>{char}</CurrentLetter>
					} else return <span key={index}>{char}</span>
				})}
			</Text>
		</div>
	)
}

export default TextDisplay
