import styled from 'styled-components'
import { green, modalBackgroundColor, borderRadius } from '../../theme'

export const TyperyContainer = styled.div`
	textarea {
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
		font-family: 'Baloo Bhaina 2', sans-serif;
		font-size: 4em;
		font-weight: 700;
		text-align: center;
		padding: 3.5em 0;
		${({ hasFocus }) => hasFocus && `opacity: 0; cursor: default;`};
	}
`
