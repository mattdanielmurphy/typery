const increaseCharIndex = (textObject, setTextObject, n = 1) => {
	const currentCharIndex = textObject.currentCharIndex + n
	const currentChar = textObject.currentSentence[currentCharIndex]
	setTextObject({ ...textObject, currentChar, currentCharIndex })
}

const advanceSentence = (textObject, setTextObject) => {
	setTextObject({
		...textObject,
		currentSentenceIndex: textObject.currentSentenceIndex + 1,
		currentSentence: textObject.text[textObject.currentSentenceIndex + 1],
		currentCharIndex: 0,
		currentChar: textObject.text[textObject.currentSentenceIndex + 1][0]
	})
}

const advanceCursor = (textObject, setTextObject, advanceOptions) => {
	const endOfText = textObject.text.length - 1 === textObject.currentSentenceIndex
	const endOfSentence = textObject.currentSentence.length - 1 === textObject.currentCharIndex
	if (advanceOptions && advanceOptions.advanceTwice) {
		const nextChar = textObject.currentSentence[textObject.currentCharIndex + 1]
		increaseCharIndex(textObject, setTextObject, 2)
	} else if (endOfSentence) {
		if (endOfText) setTextObject()
		else advanceSentence(textObject, setTextObject)
	} else increaseCharIndex(textObject, setTextObject)
}

export default advanceCursor
