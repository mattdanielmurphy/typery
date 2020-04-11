import React, { useState } from 'react'
import formatInputtedText from './logic/formatInputtedText'
import styled from 'styled-components'

const handleChange = (e) => {}

const Options = ({ options, setOptions, config }) => {
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

const UnstyledBoolean = ({ name }) => {
	const handleChange = (e) => {
		console.log(e)
	}
	return (
		<div>
			<label>{name}</label>
			<input type="checkbox" name="highlight-current-color" id="name" onChange={handleChange} />
		</div>
	)
}

const Boolean = styled(UnstyledBoolean)`#options{font-family: 'Inter';text-align:left;}`

const HighlightCurrentColor = () => <Boolean name="Highlight current color" />

export default Options
