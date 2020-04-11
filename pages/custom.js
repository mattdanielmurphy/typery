import React from 'react'
import App from '../components/App'
import AppContainer from '../containers/AppContainer'
import PageContainer from '../containers/PageContainer'

const config = { mode: 'custom' }

const Custom = (props) => (
	<PageContainer title="Custom Text Mode">
		<AppContainer>
			<App config={config} />
		</AppContainer>
	</PageContainer>
)

export default Custom
