import React from 'react'
import { Typery } from '../components'
import AppContainer from '../containers/AppContainer'
import PageContainer from '../containers/PageContainer'

const config = { mode: 'auto' }

const Auto = (props) => (
	<PageContainer title="Typery | Auto Mode">
		<AppContainer>
			<Typery config={config} />
		</AppContainer>
	</PageContainer>
)

export default Auto
