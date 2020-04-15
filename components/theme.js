import theme from 'styled-theming'

export const backgroundColor = theme('mode', {
	light: '#fafafa',
	dark: '#222'
})
export const textColor = theme('mode', {
	light: '#000',
	dark: '#fff'
})
export const green = theme('mode', {
	light: '#37b948',
	dark: '#35fc4f'
})
export const grey = theme('mode', {
	light: 'rgba(0,0,0,0.05)',
	dark: 'rgba(0,0,0,0.12)'
})
export const modalBackgroundColor = theme('mode', {
	light: 'rgba(240, 240, 240, 0.9)',
	dark: 'rgba(30, 30, 30, 0.9)'
})
export const borderRadius = '0.4em'
