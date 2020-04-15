import React from 'react'
import Typer from '../components/Typer'
import AppContainer from '../containers/AppContainer'
import PageContainer from '../containers/PageContainer'

const config = { mode: 'auto' }

const Auto = (props) => (
	<PageContainer title="Auto-Generated Text Mode">
		<AppContainer>
			<Typer config={config} />
		</AppContainer>
	</PageContainer>
)

export default Auto
