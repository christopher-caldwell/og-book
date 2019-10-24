module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ["plugin:vue/essential", "eslint:recommended"],
	rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // always use single quotes
    quotes: [2, 'single', { avoidEscape: true }],
    // errors when semi colon are used to close
    semi: ['error', 'never'],
    // requires commas after every available option
    'comma-dangle': [0, 'always']
  },
	parserOptions: {
		parser: "babel-eslint"
	},
	overrides: [
		{
			files: [
				"**/__tests__/*.{j,t}s?(x)",
				"**/tests/unit/**/*.spec.{j,t}s?(x)"
			],
			env: {
				jest: true
			}
		}
	]
};
