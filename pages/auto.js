import React from 'react'
import Typery from '~/app/Typery'
import PageContainer from '~/containers/PageContainer'

const config = { mode: 'auto' }

const Auto = (props) => (
	<PageContainer title="Typery | Auto Mode">
		<Typery config={config} />
	</PageContainer>
)

export default Auto
