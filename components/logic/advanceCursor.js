const advanceCursor = (textObject, setTextObject) => {
	const endOfText = textObject.text.length - 1 === textObject.currentSentenceIndex
	const endOfSentence = textObject.currentSentence.length - 1 === textObject.currentCharIndex

	if (endOfSentence) {
		if (endOfText) {
			setTextObject()
		} else {
			// End of sentence
			setTextObject({
				...textObject,
				currentSentenceIndex: textObject.currentSentenceIndex + 1,
				currentSentence: textObject.text[textObject.currentSentenceIndex + 1],
				currentCharIndex: 0,
				currentChar: textObject.text[textObject.currentSentenceIndex + 1][0]
			})
		}
	} else {
		// Not end of sentence
		const currentCharIndex = textObject.currentCharIndex + 1
		const currentChar = textObject.currentSentence[currentCharIndex]
		// console.table({ currentChar, currentCharIndex })
		setTextObject({ ...textObject, currentChar, currentCharIndex })
	}
}

export default advanceCursor
