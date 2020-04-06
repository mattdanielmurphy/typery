import React from 'react'
import Head from 'next/head'
import Nav from '../components/Nav'
import App from '../components/App'
import AppContainer from '../containers/appContainer'
import '../styles/sass/style.scss'

const config = { value: 1 }

const Auto = () => (
	<div>
		<Head>
			<title>Auto-Generated Text Mode</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<Nav />
		<AppContainer>
			<App config={config} />
		</AppContainer>

		<style jsx>{`
			.hero {
				width: 100%;
				color: #333;
			}
			.title {
				margin: 0;
				width: 100%;
				padding-top: 80px;
				line-height: 1.15;
				font-size: 48px;
			}
			.title,
			.description {
				text-align: center;
			}
		`}</style>
	</div>
)

export default Auto
