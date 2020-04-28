import makeStyledTheme from 'styled-theming'

const createStyledTheme = (theme) => {
	const styledTheme = {}
	Object.entries(theme).forEach(([ property, value ]) => {
		if (Array.isArray(value)) {
			const [ light, dark ] = value
			styledTheme[property] = makeStyledTheme('mode', { light, dark })
		} else {
			styledTheme[property] = value
		}
	})
	return styledTheme
}

export { createStyledTheme }
