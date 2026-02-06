import { isPunctuation } from "./normalizeText"

const increaseCharIndex = (textObject, setTextObject, n = 1, missed = false, options = {}) => {
	let nextIndex = textObject.currentCharIndex + n

	// Skip punctuation if enabled
	if (options.skipPunctuationAndIgnoreCapitalLetters?.value) {
		while (nextIndex < textObject.currentSentence.length && isPunctuation(textObject.currentSentence[nextIndex])) {
			nextIndex++
		}
	}

	const currentChar = textObject.currentSentence[nextIndex] || ""
	const missedIndices = missed ? [...textObject.missedIndices, textObject.currentCharIndex] : textObject.missedIndices
	setTextObject({ ...textObject, currentChar, currentCharIndex: nextIndex, missedIndices, pendingBuffer: [] })
}

const advanceSentence = (textObject, setTextObject, options = {}) => {
	const endTime = Date.now()
	const { startTime, currentSentence, avgWpm, totalSentences } = textObject
	const durationInMinutes = (endTime - startTime) / 1000 / 60
	const words = currentSentence.length / 5
	const wpm = Math.round(words / durationInMinutes)

	const newTotalSentences = totalSentences + 1
	const newAvgWpm = Math.round((avgWpm * totalSentences + wpm) / newTotalSentences)

	const nextSentenceIndex = textObject.currentSentenceIndex + 1
	const nextSentenceRaw = textObject.text[nextSentenceIndex] || ""

	let nextCharIndex = 0
	// Skip leading punctuation in next sentence if enabled
	if (options.skipPunctuationAndIgnoreCapitalLetters?.value) {
		while (nextCharIndex < nextSentenceRaw.length && isPunctuation(nextSentenceRaw[nextCharIndex])) {
			nextCharIndex++
		}
	}

	setTextObject({
		...textObject,
		wpm,
		avgWpm: newAvgWpm,
		totalSentences: newTotalSentences,
		startTime: null,
		currentSentenceIndex: nextSentenceIndex,
		currentSentence: nextSentenceRaw,
		currentCharIndex: nextCharIndex,
		currentChar: nextSentenceRaw[nextCharIndex] || "",
		missedIndices: [],
		pendingBuffer: [],
		history: [...(textObject.history || []), currentSentence],
	})
}

const advanceCursor = (textObject, setTextObject, advanceOptions, options = {}) => {
	const jump = (advanceOptions && advanceOptions.n) || 1
	let nextIndex = textObject.currentCharIndex + jump

	// Skip punctuation if enabled
	if (options.skipPunctuationAndIgnoreCapitalLetters?.value) {
		while (nextIndex < textObject.currentSentence.length && isPunctuation(textObject.currentSentence[nextIndex])) {
			nextIndex++
		}
	}

	const endOfText = textObject.text.length - 1 === textObject.currentSentenceIndex
	const endOfSentence = nextIndex >= textObject.currentSentence.length

	if (endOfSentence) {
		if (endOfText) {
			const endTime = Date.now()
			const { startTime, currentSentence, avgWpm, totalSentences } = textObject
			const durationInMinutes = (endTime - startTime) / 1000 / 60
			const words = currentSentence.length / 5
			const wpm = Math.round(words / durationInMinutes)

			const newTotalSentences = totalSentences + 1
			const newAvgWpm = Math.round((avgWpm * totalSentences + wpm) / newTotalSentences)

			setTextObject(null, { wpm, avgWpm: newAvgWpm, totalSentences: newTotalSentences })
		} else advanceSentence(textObject, setTextObject, options)
	} else {
		increaseCharIndex(textObject, setTextObject, jump, advanceOptions && advanceOptions.missed, options)
	}
}

export default advanceCursor
