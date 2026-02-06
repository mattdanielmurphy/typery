const withFonts = require("next-fonts")
const path = require("path")

module.exports = withFonts({
	webpack(config, options) {
		config.resolve.alias["react"] = path.resolve(__dirname, "node_modules", "react")
		config.resolve.alias["react-dom"] = path.resolve(__dirname, "node_modules", "react-dom")
		return config
	},
})
