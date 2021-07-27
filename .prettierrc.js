const { prettier } = require('@umijs/fabric');

module.exports = {
	...prettier,
	tabWidth: 2,
	semi: true,
	singleQuote: true,
	useTabs: true,
	printWidth: 80,
};
