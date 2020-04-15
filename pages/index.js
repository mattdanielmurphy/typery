import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { textColor, grey } from '../components/theme'
import PageContainer from '../containers/PageContainer'

import { Card, Row } from '../components/styled/layout'
import { Title, Description } from '../components/styled/Title'

const Custom = (props) => (
	<PageContainer title="Typer | Home">
		<Title>Welcome to Typer</Title>
		<Description>
			Improving your typing efficiently the way <em>you</em> want.
		</Description>

		<Row>
			<Link href="multiplayer">
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

			<Link href="custom">
				<Card disabled>
					<h3>Custom Text Mode</h3>
					<p>Type your favorite book, poem, essay, whatever--I don't care!</p>
				</Card>
			</Link>
		</Row>
	</PageContainer>
)

export default Custom
