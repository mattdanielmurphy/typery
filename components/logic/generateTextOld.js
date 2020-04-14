import React from 'react'

const vowels = [ 'a', 'e', 'i', 'o', 'u' ]
const consts = [
	'b',
	'c',
	'd',
	'f',
	'g',
	'h',
	'j',
	'k',
	'l',
	'm',
	'n',
	'p',
	'qu',
	'r',
	's',
	't',
	'v',
	'w',
	'x',
	'y',
	'z',
	'tt',
	'ch',
	'sh'
]

const generateWord = (length, focusLetter) => {
	let word = ''

	let is_vowel = false

	let array = []

	for (let i = 0; i < length; i++) {
		if (is_vowel) array = vowels
		else array = consts
		is_vowel = !is_vowel

		word += array[Math.round(Math.random() * (array.length - 1))]
	}
	if (focusLetter) {
		if (word.includes(focusLetter)) return word
		else return generateWord(length, focusLetter)
	} else return word
}

const generateText = ({ focusLetter }) => {
	console.log('gen text', focusLetter)

	const sentences = 10
	const words = 5
	const wordLength = () => Math.floor(3 * Math.random()) + 3
	const text = []
	for (let s = 0; s < sentences; s++) {
		let sentence = ''
		for (let w = 0; w < words; w++) {
			const word = generateWord(wordLength(), focusLetter)

			sentence += `${word} `
		}
		text.push(sentence.trim())
	}
	return text
}

export default generateText
