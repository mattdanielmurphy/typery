import React, { Fragment as F } from "react"
import { currentKeyColor, green, red, textColor } from "../theme"

import styled from "styled-components"

const StyledLetter = styled.span`
	color: ${(p) => currentKeyColor(p)};
`

const Space = styled(StyledLetter)`
	border-bottom: 3px solid
		${({ isCurrent, isMissed }) =>
			isCurrent ? green
			: isMissed ? red
			: "transparent"};
	padding: 0 0.1em;
	display: inline-block;
	padding-bottom: 2px;
	margin-top: 2px;
`

const Text = styled.div`
	max-width: 800px;
	padding-top: 0.5em;
	margin: 0 auto;
	font-size: 1.2rem;
	padding-bottom: 0;
	span {
		line-height: 1.4em;
	}
`

const History = styled.div`
	color: ${textColor};
	font-size: 1.2rem;
	margin-bottom: 0.5em;
	max-height: 300px;
	overflow-y: auto;
	padding-right: 20px;
	mask-image: linear-gradient(to bottom, transparent, black 20%);
	display: flex;
	flex-direction: column;
	gap: 0.5em;

	&::-webkit-scrollbar {
		width: 6px;
	}
	&::-webkit-scrollbar-thumb {
		background: ${green}33;
		border-radius: 10px;
	}
	&::-webkit-scrollbar-track {
		background: transparent;
	}
`

const HistorySentence = styled.div`
	opacity: 0.4;
	line-height: 1.4;
	transition: opacity 0.3s ease;
	&:last-child {
		opacity: 0.7;
	}
`

const TextDisplay = ({ currentSentence, currentCharIndex, missedIndices, history = [] }) => {
	const characters = currentSentence ? currentSentence.split("") : []
	const historyRef = React.useRef(null)

	React.useEffect(() => {
		if (historyRef.current) {
			historyRef.current.scrollTo({
				top: historyRef.current.scrollHeight,
				behavior: "smooth",
			})
		}
	}, [history])

	return (
		<div style={{ maxWidth: "900px", margin: "0 auto", padding: "2em 1em" }}>
			<History ref={historyRef}>
				{history.map((sentence, i) => (
					<HistorySentence key={i}>{sentence}</HistorySentence>
				))}
			</History>
			<Text>
				{characters.map((charValue, index) => {
					const isMissed = missedIndices && missedIndices.includes(index)
					const char = { children: charValue, isCurrent: index === currentCharIndex, isMissed }
					const isSpace = charValue === " "
					return isSpace ? <Space key={index} {...char} /> : <StyledLetter key={index} {...char} />
				})}
			</Text>
		</div>
	)
}

export default TextDisplay
