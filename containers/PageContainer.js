import React, { useState } from 'react'
import Head from 'next/head'
import Nav from '../components/Nav'
import styled, { withTheme } from 'styled-components'
import { MyThemeProvider, useTheme } from '../components/ThemeContext'
import ToggleNightModeButton from '../components/ToggleNightModeButton'

const PageContainer = (props) => {
	return (
		<MyThemeProvider>
			<Head>
				<title>{props.title}</title>
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>

			<Nav />
			{props.children}
		</MyThemeProvider>
	)
}

export default PageContainer
