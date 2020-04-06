import React from 'react'

const TextDisplay = () => {
	return (
		<div>
			<div id="text">Type what you see here.</div>
			<style jsx>{`
				#text {
					font-size: 2em;
					font-family: 'Lucida Console', Monaco, monospace;
				}
			`}</style>
		</div>
	)
}

export default TextDisplay
