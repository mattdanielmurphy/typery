// const withSass = require('@zeit/next-sass')
// const withCss = require('@zeit/next-css')
const withFonts = require('next-fonts')
const path = require('path')

module.exports = withFonts({
	webpack: (config) => {
		config.resolve.alias['~'] = path.resolve(__dirname)
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
