import React, { useState } from 'react'
import formatInputtedText from './logic/formatInputtedText'
import styled from 'styled-components'

const handleChange = (e) => {}

String.prototype.toCamelCase = function() {
	return this.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
		return index === 0 ? word.toLowerCase() : word.toUpperCase()
	}).replace(/\s+/g, '')
}

const UnstyledBoolean = ({ name }) => {
	const camelName = name.toCamelCase()
	const handleChange = (e) => {
		console.log(e)
	}
	return (
		<div>
			<label>{name}</label>
			<input type="checkbox" name={name} id={camelName} onChange={handleChange} />
		</div>
	)
}

const Boolean = styled(UnstyledBoolean)`#options{font-family: 'Inter';text-align:left;}`

const HighlightCurrentColor = () => <Boolean name="Highlight current color" />
const OptionsPanel = ({ options, setOptions, config }) => {
	const handleClick = (e) => {
		const inputtedText = document.getElementById('custom-text-input').value
		const text = formatInputtedText(inputtedText, 40)
		console.table({ text })
		setOptions({ text, ...options }, true)
	}
	return (
		<div id="options">
			<h1>Options</h1>
			<HighlightCurrentColor />
			{config.mode === 'custom' && (
				<textarea name="textInput" id="custom-text-input" cols="50" rows="10" onChange={handleChange} />
			)}
			<button onClick={handleClick}>Submit</button>
		</div>
	)
}

export default OptionsPanel
