import React, { Fragment, useState } from "react"
import { backgroundColor, borderRadius, green, grey, textColor, transitionTime } from "../theme"
import { extractTextFromEpub, extractTextFromPdf, extractTextFromTxt } from "../logic/extractText"
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import formatInputtedText from "../logic/formatInputtedText"
import styled from "styled-components"

const Checkbox = styled(FontAwesomeIcon)`
	color: ${({ checked }) => (checked ? green : textColor)};
	cursor: pointer;
	position: relative;
	top: 0.03em;
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
	const [checked, setChecked] = useState(value)
	const toggle = (e) => {
		setChecked(!checked)
		setOptions({ [camelName]: { type: "Boolean", value: !checked } })
		const focusArea = document.getElementById("focus-area")
		if (focusArea) focusArea.focus()
	}
	return (
		<OptionContainer className='option' onClick={toggle}>
			<Label htmlFor={camelName}>{name}</Label>
			<Checkbox name={camelName} id={camelName} checked={checked} onClick={toggle} icon={checked ? faToggleOn : faToggleOff} />
		</OptionContainer>
	)
}

const NumberOption = ({ name, camelName, value, setOptions }) => {
	const handleChange = (e) => {
		const val = parseInt(e.target.value) || 0
		setOptions({ [camelName]: { type: "Number", value: val } })
	}
	return (
		<OptionContainer className='option' style={{ cursor: "default" }}>
			<Label>{name}</Label>
			<input
				type='number'
				value={value}
				onChange={handleChange}
				style={{
					background: grey,
					border: "none",
					color: textColor,
					borderRadius: borderRadius,
					padding: "0.2em 0.5em",
					width: "3em",
					fontSize: "0.8em",
					outline: "none",
					fontFamily: "inherit",
					fontWeight: "bold",
				}}
			/>
		</OptionContainer>
	)
}

const SelectOption = ({ name, camelName, value, options, setOptions }) => {
	const handleChange = (e) => {
		setOptions({ [camelName]: { type: "Select", value: e.target.value, options } })
	}
	return (
		<OptionContainer className='option' style={{ cursor: "default" }}>
			<Label>{name}</Label>
			<select
				value={value}
				onChange={handleChange}
				style={{
					background: grey,
					border: "none",
					color: textColor,
					borderRadius: borderRadius,
					padding: "0.2em 0.5em",
					fontSize: "0.8em",
					outline: "none",
					fontFamily: "inherit",
					fontWeight: "bold",
				}}
			>
				{options.map((opt) => (
					<option key={opt} value={opt}>
						{opt.capitalize()}
					</option>
				))}
			</select>
		</OptionContainer>
	)
}

const Option = (props) => {
	return (
		<div>
			{props.type === "Boolean" && <BooleanOption {...props} />}
			{props.type === "Number" && <NumberOption {...props} />}
			{props.type === "Select" && <SelectOption {...props} />}
		</div>
	)
}

const TextArea = styled.textarea`
	width: 100%;
	height: 150px;
	background: ${grey};
	border: 1px solid ${textColor}33;
	color: ${textColor};
	border-radius: ${borderRadius};
	padding: 1em;
	font-family: inherit;
	font-size: 1rem !important;
	text-align: left !important;
	margin-top: 1em;
	resize: vertical;
	outline: none;
	&:focus {
		border-color: ${green};
	}
`

const FileInput = styled.input`
	margin-top: 1em;
	display: block;
	color: ${textColor};
`

const OptionsContainer = styled.div`
	margin: 0 auto;
	max-width: 60em;
	justify-content: center;
	padding: 3em;
	padding-left: 4em;
	h1 {
		margin: 0 0 0.7em -0.5em;
	}
`

const OptionsPanel = ({ options, setOptions, config }) => {
	const optionsArray = Object.entries(options).filter(([key]) => key !== "text")

	const processText = (text) => {
		const splitSentences = text.match(/[^.!?]+[.!?]+|\S+/g) || [text]
		const cleanedSentences = splitSentences
			.map((s) => s.trim())
			.filter((s) => s.length > 0)
			.map((s) => s.replace(/\s+/g, " "))

		if (cleanedSentences.length > 0) {
			setOptions({ text: { ...options.text, value: cleanedSentences } }, true)
		}
	}

	const handleTextChange = (e) => {
		processText(e.target.value)
	}

	const handleFileUpload = async (e) => {
		const file = e.target.files[0]
		if (!file) return

		try {
			let text = ""
			if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
				text = await extractTextFromPdf(file)
			} else if (file.type === "application/epub+zip" || file.name.endsWith(".epub")) {
				text = await extractTextFromEpub(file)
			} else {
				text = await extractTextFromTxt(file)
			}
			processText(text)
		} catch (error) {
			console.error("Error extracting text:", error)
			alert("Failed to extract text from file.")
		}
	}

	return (
		<OptionsContainer>
			<h1>Options</h1>

			{optionsArray.map(([key, props], index) => {
				const name = key.fromCamelCase()
				return <Option key={index} name={name} camelName={key} {...props} setOptions={setOptions} />
			})}

			{options.mode.value === "custom" && (
				<div style={{ marginTop: "2em" }}>
					<Label style={{ marginLeft: 0 }}>Paste Text or Upload File (txt, epub, pdf)</Label>
					<TextArea placeholder='Paste your text here...' onChange={handleTextChange} />
					<FileInput type='file' accept='.txt,.pdf,.epub' onChange={handleFileUpload} />
				</div>
			)}
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
