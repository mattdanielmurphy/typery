// const withSass = require('@zeit/next-sass')
// const withCss = require('@zeit/next-css')
const withFonts = require('next-fonts')

module.exports = withFonts({
	webpack(config, options) {
		return config
	}
})
// module.exports = withFonts(withCss(
// 	withSass({
// 		webpack(config, options) {
// 			const rules = [
// 				{
// 					test: /\.scss$/,
// 					use: [ { loader: 'sass-loader' } ]
// 				}
// 			]

// 			return {
// 				...config,
// 				module: { ...config.module, rules: [ ...config.module.rules, ...rules ] }
// 			}
// 		}
// 	})
// ))
