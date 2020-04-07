import React from 'react'
import styled from 'styled-components'

const Text = styled.div`
	max-width: 800px;
	margin: 0 auto;
	font-size: 2em;
	font-family: 'Lucida Console', Monaco, monospace;
`

const CurrentLetter = styled.span`color: firebrick;`

const CurrentSpace = styled.span`border-bottom: 2px solid red;`

const TextDisplay = ({ currentSentence, currentCharIndex }) => {
	console.log(currentSentence)
	const characters = currentSentence ? currentSentence.split('') : []
	return (
		<div>
			<Text>
				{characters.map((char, index) => {
					if (index === currentCharIndex) {
						if (char === ' ') return <CurrentSpace> </CurrentSpace>
						else return <CurrentLetter>{char}</CurrentLetter>
					} else return <span>{char}</span>
				})}
			</Text>
		</div>
	)
}

export default TextDisplay
