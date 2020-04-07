import React from 'react'
import { defaultTextObject } from '../App'

const advanceCursor = (textObject, setTextObject) => {
	const endOfText = textObject.text.length - 1 === textObject.currentSentenceIndex
	const endOfSentence = textObject.currentSentence.length - 1 === textObject.currentCharIndex
	if (endOfSentence) {
		if (endOfText) {
			console.log('end of text')
			setTextObject(defaultTextObject)
		}
		console.log('END')
		setTextObject({
			...textObject,
			currentSentenceIndex: textObject.currentSentenceIndex + 1,
			currentSentence: textObject.text[textObject.currentSentenceIndex + 1],
			currentCharIndex: 0,
			currentChar: textObject.text[textObject.currentSentenceIndex + 1][0]
		})
	} else {
		const currentCharIndex = textObject.currentCharIndex + 1
		const currentChar = textObject.currentSentence[currentCharIndex]
		setTextObject({ ...textObject, currentChar, currentCharIndex })
	}
}

const checkInput = (key, textObject, setTextObject) => {
	if (key === textObject.currentChar) advanceCursor(textObject, setTextObject)
}

export default checkInput
