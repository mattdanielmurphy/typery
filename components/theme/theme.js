import { createStyledTheme } from './createStyledTheme'

const theme = {
	backgroundColor: [ '#fff', '#000' ], // [ light, dark ]
	textColor: [ '#000', '#fff' ],
	green: [ '#37b948', '#35fc4f' ],
	grey: [ 'rgba(0,0,0,0.05)', 'rgba(255,255,255,0.05)' ],
	keyDownBackgroundColor: [ 'rgba(255,255,255,0.6)', 'rgba(0,0,0,0.12)' ],
	modalBackgroundColor: [ 'rgba(240, 240, 240, 0.9)', 'rgba(0, 0, 0, 0.9)' ],
	modalBorder: [ 'rgba(240, 240, 240, 0.9)', 'rgba(0, 0, 0, 0.9)' ],
	borderRadius: '0.4em'
}

const styledTheme = createStyledTheme(theme)

module.exports = {
	...styledTheme,
	currentKeyColor: ({ isCurrent }) => (isCurrent ? styledTheme.green : styledTheme.textColor)
}
