import React from 'react'
import Link from 'next/link'
import PageContainer from '../containers/PageContainer'

import { Row, Card } from '../components/styled/layout'
import { Title, Description } from '../components/styled/Title'

const Custom = (props) => (
	<PageContainer title="Typer | Custom Text Mode: Coming Soon!">
		<Title>Custom Text Mode</Title>
		<Description>Coming soon. I promise.</Description>
		<Row>
			<Link href="auto">
				<Card>
					<h3>Auto-Generated Text Mode</h3>
					<p>Learn to type by typing word fragments automatically generated based on your weakest letter.</p>
				</Card>
			</Link>
		</Row>
	</PageContainer>
)

export default Custom
