import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { backgroundColor, textColor } from './theme'
import cookies from 'next-cookies'

const ThemeToggleContext = React.createContext()
const defaultMode = 'light'

export const useTheme = () => React.useContext(ThemeToggleContext)

export const MyThemeProvider = ({ children }) => {
	const [ themeState, setThemeState ] = React.useState({
		mode: 'dark'
	})

	const setTheme = (mode = defaultMode) => {
		// set cookie
		setThemeState({ mode })
	}

	const toggle = () => {
		const mode = themeState.mode === 'light' ? `dark` : `light`
		setTheme(mode)
	}

	return (
		<ThemeToggleContext.Provider value={{ toggle: toggle }}>
			<ThemeProvider
				theme={{
					mode: themeState.mode
				}}
			>
				<Wrapper>{children}</Wrapper>
			</ThemeProvider>
		</ThemeToggleContext.Provider>
	)
}

const Wrapper = styled.div`
	background-color: ${backgroundColor};
	color: ${textColor};
	position: absolute;
	min-height: 100%;
	left: 0;
	right: 0;
	top: 0;
	font-family: 'Inter', sans-serif;
`

export default ThemeProvider
