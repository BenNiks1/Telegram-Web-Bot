module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
		es2021: true,
		'vue/setup-compiler-macros': true,
	},
	extends: [
		'plugin:vue/vue3-recommended',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'prettier',
	],
	plugins: ['prettier'],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'vue/no-v-html': 0,
		'no-lone-blocks': 0,
		'semi-style': 'off',
		'vue/no-v-model-argument': 'off',
		'vue/script-setup-uses-vars': 'warn',
		'vue/component-api-style': [
			'warn',
			['script-setup', 'composition'], // "script-setup", "composition", "composition-vue2", or "options"
		],
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/ban-ts-comment': [
			'warn',
			{
				'ts-expect-error': 'allow-with-description',
			},
		],
		'vue/order-in-components': [
			'error',
			{
				order: [
					'name',
					'directives',
					'components',
					'mixins',
					['provide', 'inject'],
					'model',
					'props',
					'filters',
					'data',
					'computed',
					'watch',
					'methods',
					'LIFECYCLE_HOOKS',
					'ROUTER_GUARDS',
				],
			},
		],
		'vue/v-for-delimiter-style': ['error', 'in'],
		'vue/require-prop-types': 'error',
		'vue/prop-name-casing': ['error', 'camelCase'],
		'vue/component-name-in-template-casing': ['error', 'PascalCase'],
		'vue/component-definition-name-casing': ['error', 'PascalCase'],
		'vue/custom-event-name-casing': ['error', 'kebab-case'],
		'vue/max-attributes-per-line': 'off',
		'vue/this-in-template': ['error', 'never'],
		'vue/v-on-style': ['error', 'shorthand'],
		'vue/no-multi-spaces': 'error',
		'vue/padding-line-between-blocks': 'error',
		'vue/component-tags-order': [
			'error',
			{
				order: ['template', 'script', 'style'],
			},
		],
		'vue/v-bind-style': 'error',
		'vue/v-slot-style': ['error', 'shorthand'],
		'vue/no-undef-properties': 'off',
		'vue/no-unused-properties': [
			'error',
			{
				groups: ['props', 'data', 'computed', 'methods', 'setup'],
				ignorePublicMembers: true,
				deepData: true,
			},
		],
	},
};
