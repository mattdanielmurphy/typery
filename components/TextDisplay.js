import React from 'react'
import styled from 'styled-components'

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

const Text = styled.div`
	max-width: 800px;
	margin: 0 auto;
	font-size: 2em;
	font-family: 'Lucida Console', Monaco, monospace;
`

const CurrentLetter = styled.span`color: #35fc4f;`

const CurrentSpace = styled.span`border-bottom: 2px solid #35fc4f;`

export default TextDisplay
