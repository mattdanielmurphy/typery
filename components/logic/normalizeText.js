export const isPunctuation = (char) => {
	return /[.,;:!?'"()[\]{}<>—–\-…«»]/.test(char)
}

export const findNextNonPunctuation = (sentence, startIndex) => {
	for (let i = startIndex; i < sentence.length; i++) {
		if (!isPunctuation(sentence[i])) {
			return { char: sentence[i], index: i }
		}
	}
	return null
}

export const normalizeText = (rawString) => {
	if (!rawString) return ""

	let normalized = rawString
		// Fancy Quotes -> ASCII
		.replace(/[\u201C\u201D\u00AB\u00BB\u201E\u201F]/g, '"')
		.replace(/[\u2018\u2019\u201A\u201B\u2039\u203A]/g, "'")
		// Ligatures -> Individual Chars
		.replace(/\uFB00/g, "ff")
		.replace(/\uFB01/g, "fi")
		.replace(/\uFB02/g, "fl")
		.replace(/\uFB03/g, "ffi")
		.replace(/\uFB04/g, "ffl")
		.replace(/\uFB05/g, "ft")
		.replace(/\uFB06/g, "st")
		.replace(/\u00E6/g, "ae")
		.replace(/\u00C6/g, "AE")
		.replace(/\u0153/g, "oe")
		.replace(/\u0152/g, "OE")
		// Punctuation Normalization
		.replace(/[\u2014\u2015]/g, "--") // em-dash, horizontal bar
		.replace(/[\u2012\u2013]/g, "-") // figure dash, en-dash
		.replace(/\u2026/g, "...") // ellipsis

		// Whitespace Normalization
		.replace(/\r\n/g, "\n")
		.replace(/\r/g, "\n")
		.replace(/\n+/g, " ")
		.replace(/\s+/g, " ")
		.trim()

	return normalized
}
