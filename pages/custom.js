import React from 'react'
import Typer from '../components/Typer'
import AppContainer from '../containers/AppContainer'
import PageContainer from '../containers/PageContainer'

const config = { mode: 'custom' }

const Custom = (props) => (
	<PageContainer title="Custom Text Mode">
		<AppContainer>
			<Typer config={config} />
		</AppContainer>
	</PageContainer>
)

export default Custom
