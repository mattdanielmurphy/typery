module.exports = {
	extends: [ `../../.config/yarn/global/node_modules/stylelint-config-recommended` ],
	rules: {
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [ 'tailwind', 'apply', 'variants', 'responsive', 'screen' ]
			}
		],
		'declaration-block-trailing-semicolon': null,
		'no-descending-specificity': null
	}
}
