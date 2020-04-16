import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { backgroundColor, textColor } from './theme'
import cookies from 'next-cookies'

const ThemeToggleContext = React.createContext()
const defaultMode = 'light'

export const useTheme = () => React.useContext(ThemeToggleContext)

export const MyThemeProvider = ({ children }) => {
	const [ themeState, setThemeState ] = React.useState({ mode: defaultMode })

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
	box-sizing: border-box;
	left: 0;
	right: 0;
	top: 0;
	font-family: 'Baloo Bhaina 2';
	font-size: 1.1em;
`

export default ThemeProvider

// Explanation:
// https://medium.com/@rossbulat/react-dark-mode-with-styled-theming-and-context-57557de6400
// https://github.com/rossbulat/react-theming-dark-mode/tree/master/src
