import { borderRadius, green, modalBackgroundColor } from "../../theme"

import styled from "styled-components"

export const TyperyContainer = styled.div`
	textarea#focus-area {
		appearance: none;
		border: none;
		resize: none;
		position: absolute;
		width: 90%;
		left: 5%;
		background: ${modalBackgroundColor};
		border-radius: ${borderRadius};
		cursor: pointer;
		color: ${green};
		font-family: "Baloo Bhaina 2", sans-serif;
		font-size: 1rem;
		text-align: center;
		padding: 1em 0;
		${({ hasFocus }) =>
			!hasFocus &&
			`
			font-size: 4em;
			font-weight: 700;
			padding: 3.5em 0;
		`};
		${({ hasFocus }) => hasFocus && `opacity: 0; cursor: default;`};
	}
`

export const StatsContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 2em;
	height: 1.5em;
	margin-top: 2em;
	opacity: ${({ visible }) => (visible ? 1 : 0)};
	transition: opacity 0.5s ease;
`

export const Stat = styled.div`
	text-align: center;
	font-size: 1.5em;
	font-weight: 700;
	color: ${green};
	span {
		font-size: 0.6em;
		text-transform: uppercase;
		display: block;
		margin-bottom: -0.25em;
		opacity: 0.7;
	}
`
