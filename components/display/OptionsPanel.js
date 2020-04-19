import React, { useState, Fragment } from 'react'
import formatInputtedText from '../logic/formatInputtedText'
import { green, grey, borderRadius, textColor, backgroundColor, transitionTime } from '../theme'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'

const Checkbox = styled(FontAwesomeIcon)`
	color: ${({ checked }) => (checked ? green : textColor)};
	cursor: pointer;
	position:relative;
	top: .03em;
	transition: color ${transitionTime};
`

const Label = styled.span`
	transition: color ${transitionTime};
	margin: 0 0.5em;
`

const OptionContainer = styled.div`
	display: inline-block;
	cursor: pointer;
	&:hover {
		span {
			color: ${green};
		}
	}
	font-size: 1.2em;
`

const BooleanOption = ({ name, camelName, value, setOptions }) => {
	const [ checked, setChecked ] = useState(value)
	const toggle = (e) => {
		setChecked(!checked)
		setOptions({ [camelName]: { type: 'Boolean', value: !checked } })
		const focusArea = document.getElementById('focus-area')
		focusArea.focus()
	}
	return (
		<OptionContainer className="option" onClick={toggle}>
			<Label htmlFor={camelName}>{name}</Label>
			<Checkbox
				name={camelName}
				id={camelName}
				checked={checked}
				onClick={toggle}
				icon={checked ? faToggleOn : faToggleOff}
			/>
		</OptionContainer>
	)
}

const Option = (props) => {
	return <div>{props.type === 'Boolean' && <BooleanOption {...props}>hey</BooleanOption>}</div>
}

const OptionsContainer = styled.div`
	margin: 0 auto;
	max-width: 60em;
	justify-content: center;
	padding: 3em;
	padding-left: 4em;
	h1 {
		margin: 0 0 .7em -.5em;
	}
`

const OptionsPanel = ({ options, setOptions, config }) => {
	const optionsArray = Object.entries(options)
	return (
		<OptionsContainer>
			<h1>Options</h1>

			{optionsArray.map(([ key, props ], index) => {
				const name = key.fromCamelCase()
				return <Option key={index} name={name} camelName={key} {...props} setOptions={setOptions} />
			})}
		</OptionsContainer>
	)
}

export default OptionsPanel

// {config.mode === 'custom' && <textarea name="textInput" id="custom-text-input" cols="50" rows="10" onChange={handleChange} />}
// <button onClick={handleClick}>Submit</button>
//
// const handleClick = (e) => {
// 	const inputtedText = document.getElementById('custom-text-input').value
// 	const text = formatInputtedText(inputtedText, 40)
// 	console.table({ text })
// 	setOptions({ text }, true)
// }
