import React from 'react'
import NextApp, { Container } from 'next/app'
import dynamic from 'next/dynamic'

import '~/common/utils/stringMethods'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

class App extends NextApp {
	render() {
		const { Component, pageProps } = this.props
		return <Component {...pageProps} />
	}
}

export default dynamic(() => Promise.resolve(App), {
	ssr: false
})
