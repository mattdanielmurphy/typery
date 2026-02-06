import { backgroundColor, textColor } from "./theme"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"

import React from "react"
import cookies from "next-cookies"

const ThemeToggleContext = React.createContext()
const defaultMode = "light"

const GlobalStyle = createGlobalStyle`
	html, body {
		background-color: ${backgroundColor};
		color: ${textColor};
		margin: 0;
		padding: 0;
		min-height: 100%;
		transition: background-color 0.3s ease;
	}
`

export const useTheme = () => React.useContext(ThemeToggleContext)

export const MyThemeProvider = ({ children }) => {
	const [themeMode, setThemeMode] = React.useState("light")

	React.useEffect(() => {
		const mql = window.matchMedia("(prefers-color-scheme: dark)")
		const handleChange = (e) => setThemeMode(e.matches ? "dark" : "light")

		setThemeMode(mql.matches ? "dark" : "light")
		mql.addListener(handleChange)
		return () => mql.removeListener(handleChange)
	}, [])

	return (
		<ThemeToggleContext.Provider value={{ mode: themeMode }}>
			<ThemeProvider
				theme={{
					mode: themeMode,
				}}
			>
				<GlobalStyle />
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
	font-family: "Baloo Bhaina 2";
	font-size: 1.1em;
`

export default ThemeProvider

// Explanation:
// https://medium.com/@rossbulat/react-dark-mode-with-styled-theming-and-context-57557de6400
// https://github.com/rossbulat/react-theming-dark-mode/tree/master/src
