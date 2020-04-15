import React from 'react'
import App from '../components/App'
import AppContainer from '../containers/AppContainer'
import PageContainer from '../containers/PageContainer'

const config = { mode: 'auto' }

const Auto = (props) => (
	<PageContainer title="Auto-Generated Text Mode">
		<AppContainer>
			<App config={config} />
		</AppContainer>
	</PageContainer>
)

export default Auto
