import React, { useEffect, useState } from "react"
import { Stat, StatsContainer, TyperyContainer } from "./TyperyContainer"
import { backgroundColor, borderRadius, green, useTheme } from "../../theme"

import { FocusArea } from "../FocusArea"
import Keyboard from "../Keyboard"
import OptionsPanel from "../OptionsPanel"
import TextDisplay from "../TextDisplay"
import formatInputtedText from "../../logic/formatInputtedText"
import generateText from "../../logic/generateText"
import styled from "styled-components"

const SkipButton = styled.button`
	display: block;
	margin: 0 auto 1.5em auto;
	background: ${green}22;
	border: 1px solid ${green};
	color: ${green};
	padding: 0.5em 1.2em;
	border-radius: ${borderRadius};
	cursor: pointer;
	font-family: inherit;
	font-weight: bold;
	font-size: 0.9em;
	transition: all 0.2s;
	opacity: 0.8;
	&:hover {
		background: ${green};
		color: ${backgroundColor};
		opacity: 1;
	}
`

const focusLetter = ""

const minLength = 3
const maxLength = 8

const defaultTextObject = (text = generateText({ focusLetter, minLength, maxLength })) => {
	const currentSentence = text[0] || ""
	return {
		text,
		currentSentenceIndex: 0,
		currentSentence,
		currentCharIndex: 0,
		currentChar: currentSentence[0] || "",
		missedIndices: [],
		pendingBuffer: [],
		startTime: null,
		wpm: 0,
		avgWpm: 0,
		totalSentences: 0,
		history: [],
	}
}

const defaultOptions = (text) => ({
	mode: { type: "Select", value: "random", options: ["random", "custom"] },
	skipPunctuationAndIgnoreCapitalLetters: { type: "Boolean", value: true },
	skipSpace: { type: "Boolean", value: false },
	sentenceLength: { type: "Number", value: 5 },
	text: { type: "Array", value: text, scope: "custom" }, // scope is mode that this option will appear in
})

const Typery = ({ config, theme }) => {
	const themeToggle = useTheme()

	const [textObject, setTextObjectState] = useState(defaultTextObject())
	const [keysDown, setKeysDown] = useState({})
	const [options, setOptionsState] = useState(defaultOptions(textObject.text))
	const [hasFocus, setHasFocus] = useState(false)
	const [isLoaded, setIsLoaded] = useState(false)

	// Load options from localStorage on mount
	useEffect(() => {
		const savedOptions = localStorage.getItem("typery-options")
		if (savedOptions) {
			try {
				const parsed = JSON.parse(savedOptions)
				setOptionsState((prev) => {
					const next = { ...prev }
					Object.keys(parsed).forEach((key) => {
						// Migration/Renaming check
						if (key === "lenientMode") {
							next.skipPunctuationAndIgnoreCapitalLetters.value = parsed[key].value
						} else if (next[key] && key !== "text") {
							next[key].value = parsed[key].value
						}
					})
					return next
				})
			} catch (e) {
				console.error("Failed to parse saved options", e)
			}
		}

		// Load custom text and progress

		const savedCustomText = localStorage.getItem("typery-custom-text")
		const savedProgress = localStorage.getItem("typery-custom-progress")
		const currentMode = localStorage.getItem("typery-options") ? JSON.parse(localStorage.getItem("typery-options")).mode?.value : "random"

		if (currentMode === "custom" && savedCustomText) {
			try {
				const sentences = JSON.parse(savedCustomText)
				const progress = savedProgress ? parseInt(savedProgress) : 0
				const index = Math.min(progress, sentences.length - 1)
				const currentSentence = sentences[index] || ""

				setTextObjectState((prev) => ({
					...prev,
					text: sentences,
					currentSentenceIndex: index,
					currentSentence,
					currentChar: currentSentence[0] || "",
					history: sentences.slice(0, index),
				}))

				setOptionsState((prev) => ({
					...prev,
					text: { ...prev.text, value: sentences },
				}))
			} catch (e) {
				console.error("Failed to parse saved custom text", e)
			}
		}
		setIsLoaded(true)
	}, [])

	// Save options to localStorage when they change
	useEffect(() => {
		const optionsToSave = { ...options }
		delete optionsToSave.text
		localStorage.setItem("typery-options", JSON.stringify(optionsToSave))
	}, [options])

	// Save progress when textObject changes
	useEffect(() => {
		if (options.mode.value === "custom" && textObject.text.length > 0) {
			localStorage.setItem("typery-custom-text", JSON.stringify(textObject.text))
			localStorage.setItem("typery-custom-progress", textObject.currentSentenceIndex.toString())
		}
	}, [textObject.currentSentenceIndex, textObject.text, options.mode.value])

	const setTextObject = (object, stats) => {
		if (object) setTextObjectState(object)
		else {
			let text
			if (options.mode.value === "custom" && options.text.value && options.text.value.length > 0) {
				text = options.text.value
			} else {
				text = generateText({
					focusLetter,
					minLength,
					maxLength,
					sentenceLength: options.sentenceLength.value,
				})
			}
			const newState = defaultTextObject(text)
			if (stats) {
				newState.wpm = stats.wpm
				newState.avgWpm = stats.avgWpm
				newState.totalSentences = stats.totalSentences
				newState.history = textObject.history || []
			}
			setTextObjectState(newState)
		}
	}
	const setText = (text) => {
		if (Array.isArray(text)) {
			setTextObjectState(defaultTextObject(text))
		} else if (text && text.value) {
			setTextObjectState(defaultTextObject(text.value))
		}
	}

	const setOptions = (optionsObject, reloadText = false) => {
		if (reloadText) setText(optionsObject.text)
		setOptionsState((prev) => ({ ...prev, ...optionsObject }))
	}

	useEffect(() => {
		if (!isLoaded) return
		if (options.mode.value === "random") {
			setTextObject(null)
		} else {
			// Only reset if text is different
			if (JSON.stringify(options.text.value) !== JSON.stringify(textObject.text)) {
				setText(options.text.value)
			}
		}
	}, [options.sentenceLength.value, options.mode.value, isLoaded])

	const changeSentence = (delta) => {
		const newIndex = textObject.currentSentenceIndex + delta
		if (newIndex >= 0 && newIndex < textObject.text.length) {
			const nextSentence = textObject.text[newIndex]
			setTextObjectState({
				...textObject,
				currentSentenceIndex: newIndex,
				currentSentence: nextSentence,
				currentCharIndex: 0,
				currentChar: nextSentence[0] || "",
				missedIndices: [],
				pendingBuffer: [],
				startTime: null,
				history: textObject.text.slice(0, newIndex),
			})
		}
	}

	const focusAreaProps = { setHasFocus, keysDown, setKeysDown, textObject, setTextObject, options, hasFocus }

	return (
		<TyperyContainer hasFocus={hasFocus}>
			<FocusArea {...focusAreaProps} />
			<TextDisplay currentSentence={textObject.currentSentence} currentCharIndex={textObject.currentCharIndex} missedIndices={textObject.missedIndices} history={textObject.history} />
			{options.mode.value === "custom" && (
				<div style={{ display: "flex", justifyContent: "center", gap: "1em", marginBottom: "1.5em" }}>
					<SkipButton onClick={() => changeSentence(-1)}>Prev Sentence (←)</SkipButton>
					<SkipButton onClick={() => changeSentence(1)}>Next Sentence (→)</SkipButton>
				</div>
			)}
			<Keyboard keysDown={keysDown} currentChar={textObject.currentChar} options={options} />

			<StatsContainer visible={textObject.totalSentences > 0}>
				<Stat>
					<span>Average</span>
					{textObject.avgWpm} WPM
				</Stat>
				<Stat>
					<span>Last Sentence</span>
					{textObject.wpm} WPM
				</Stat>
			</StatsContainer>
			<OptionsPanel config={config} options={options} setOptions={setOptions} />
		</TyperyContainer>
	)
}

export { Typery as default }
