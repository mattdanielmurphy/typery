import styled from 'styled-components'
import { grey, textColor } from '../theme'

export const Row = styled.div`
	max-width: 740px;
	margin: 80px auto 40px;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
`

export const Card = styled.a`
	padding: 1.2em 1.2em 1.4em;
	width: 30em;
	text-align: left;
	text-decoration: none;
	color: ${textColor};
	background: ${grey};
	cursor: pointer;
	margin: .3em;
	${({ disabled }) => disabled && `opacity: 0.6; cursor: default`};
	& h3 {
		margin: 0;
		color: #067df7;
	}
	& p {
		line-height: 1.4em;
	}
`
