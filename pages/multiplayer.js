import React from 'react'
import Head from 'next/head'
import Nav from '../components/Nav'
import App from '../components/App'
import AppContainer from '../containers/appContainer'
import '../styles/sass/style.scss'

const config = { value: 1 }

const Multiplayer = () => (
	<div>
		<Head>
			<title>Multiplayer Mode</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<Nav />
		<AppContainer>
			<h1>Multiplayer coming soon</h1>
			{/* <App config={config} mode="multiplayer" /> */}
		</AppContainer>

		<style jsx>{`
			.hero {
				width: 100%;
				color: #333;
			}
			h1 {
				text-align: center;
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

export default Multiplayer
