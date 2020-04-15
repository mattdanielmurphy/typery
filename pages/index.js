import React from 'react'
import Link from 'next/link'
import Typer from '../components/Typer'
import PageContainer from '../containers/PageContainer'
import { textColor, grey } from '../components/theme'
import styled from 'styled-components'

const Card = styled.a`
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

const Custom = (props) => (
	<PageContainer title="Custom Text Mode">
		<h1 className="title">Welcome to Untitled Typing App</h1>
		<p className="description">
			Improving your typing efficiently the way <em>you</em> want.
		</p>

		<div className="row">
			<Link href="">
				<Card disabled>
					<h3>Multiplayer</h3>
					<p>Race against another person.</p>
				</Card>
			</Link>
			<Link href="auto">
				<Card>
					<h3>Auto-Generated Text Mode</h3>
					<p>Learn to type by typing word fragments automatically generated based on your weakest letter.</p>
				</Card>
			</Link>
			<Link href="">
				<Card disabled>
					<h3>Custom Text Mode</h3>
					<p>Type your favorite book, poem, essay, whatever--I don't care!</p>
				</Card>
			</Link>
		</div>
		<style jsx>{`
			.title {
				margin: 0;
				width: 100%;
				padding-top: 80px;
				line-height: 1.15;
				font-size: 48px;
			}
			.title,
			.description {
				text-align: center;
			}
			.row {
				max-width: 740px;
				margin: 80px auto 40px;
				display: flex;
				flex-direction: row;
				justify-content: space-evenly;
			}
		`}</style>
	</PageContainer>
)

export default Custom
