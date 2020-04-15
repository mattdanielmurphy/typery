import React from 'react'
import words from './words'
const frequencies = Object.keys(words).sort((a, b) => b - a)

const generateText = ({ focusLetter, minLength, maxLength }) => {
	const largestN = 22038615
	const modifier = () => 1 / (Math.random() * 500)
	const getN = () => Math.floor(Math.random() * largestN * modifier())
	const wordsToGenerate = 5

	const testAgainstConditions = (word, sentence) => {
		let failed = false
		const test = (cond) => (cond ? '' : (failed = true))
		test(!sentence.includes(word))
		if (focusLetter) test(word.includes(focusLetter))
		if (minLength) test(word.length >= minLength)
		if (maxLength) test(word.length <= maxLength)
		return !failed
	}

	const sentence = []
	for (let i = 0; i < wordsToGenerate; i++) {
		const index = getN()

		for (let j = 0; j < frequencies.length; j++) {
			const freq = frequencies[j]
			if (freq <= index) {
				const word = words[freq].toLowerCase()
				if (testAgainstConditions(word, sentence)) {
					sentence.push(word)
					break
				}
			}
		}
	}
	return [ sentence.join(' ') ]
}

export default generateText
