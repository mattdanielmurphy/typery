String.prototype.toCamelCase = function() {
	return this.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
		return index === 0 ? word.toLowerCase() : word.toUpperCase()
	}).replace(/\s+/g, '')
}

String.prototype.toTitleCase = function() {
	return this.toLowerCase()
		.split(' ')
		.map(function(word) {
			return word.replace(word[0], word[0].toUpperCase())
		})
		.join(' ')
}

String.prototype.fromCamelCase = function() {
	const withSpaces = this.replace(/([A-Z])/g, ' $1')
	const result = withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1)
	return result
}
