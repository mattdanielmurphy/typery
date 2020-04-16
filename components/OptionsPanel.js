import React, { useState } from 'react'
import formatInputtedText from './logic/formatInputtedText'
import { green, grey, borderRadius, textColor } from './theme'
import styled from 'styled-components'

const Checkbox = styled((props) => <input type="checkbox" {...props} />)`
		vertical-align: middle;
		margin-top: 0;
		margin-right: 1em;
    border-radius: 4px;
		transition: ease 0.3s;
    background-color: rgba(0,0,0,0.2);
    cursor: pointer;
    appearance: none;
		height: 2em;
    width: 2em;
		&:checked {
			background-color: rgba(0, 0, 0, 0.5)
		}
		&:checked::before {
			content: '\\2714';
			display: block;
			font-size: 1em;
			color: #eee;
			position: relative;
			left: 0.6em;
			top: .25em;
		}
`

const Label = styled.label`cursor: pointer;`

const OptionContainer = styled.div`margin: 1em;`

const BooleanOption = ({ name, camelName, value, setOptions }) => {
	const [ checked, setChecked ] = useState(value)
	const toggle = (e) => {
		setChecked(!checked)
		setOptions({ [camelName]: { _default: !checked, type: 'Boolean', value: !checked } })
		e.target.blur()
	}
	return (
		<OptionContainer className="option">
			<Checkbox name={camelName} id={camelName} onChange={toggle} checked={checked} />
			<Label htmlFor={camelName}>{name}</Label>
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
