import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default [
	{ files: ['**/*.{js,mjs,cjs,ts}'] },
	{
		languageOptions: { ecmaVersion: 'latest', globals: globals.browser, parserOptions: { project: ['tsconfig.json'] } },
	},
	{ ignores: ['node_modules'] },
	{ plugins: { prettier } },
	{
		rules: {
			'prettier/prettier': 'error',
			'no-console': ['error', { allow: ['error', 'warn'] }],
			'prefer-const': 'warn',
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
];
