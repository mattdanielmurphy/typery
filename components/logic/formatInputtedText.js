import React from 'react'

const trimTextToNCharacters = (text, maxLength, trimmedTextArray = []) => {
	let truncatedString = ''
	for (let i = maxLength; i >= 0; i--) {
		if (/\s/.test(text[i])) {
			truncatedString = text.substring(0, i)
			text = text.substring(i + 1)
			break
		}
	}

	trimmedTextArray.push(truncatedString)

	if (text < maxLength) return [ ...trimmedTextArray, text ]
	else return trimTextToNCharacters(text, maxLength, trimmedTextArray)
}

const formatInputtedText = (text = String, maxLength = Number) => {
	if (text.length <= maxLength) return text
	else return trimTextToNCharacters(text, maxLength)
}

export default formatInputtedText
