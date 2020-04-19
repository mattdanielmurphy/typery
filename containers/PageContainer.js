import React, { useState } from 'react'
import Head from 'next/head'
import Nav from '../components/display/Nav'
import styled, { withTheme } from 'styled-components'
import { MyThemeProvider, useTheme } from '../components//theme'

const PageContainer = (props) => {
	return (
		<MyThemeProvider>
			<Head>
				<title>{props.title}</title>
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>

			<Nav theme={props.theme} />
			{props.children}
		</MyThemeProvider>
	)
}

export default PageContainer
