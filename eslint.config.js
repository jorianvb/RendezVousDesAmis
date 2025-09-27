const {
    defineConfig,
} = require('eslint/config');

const {
    fixupConfigRules,
} = require('@eslint/compat');

const tsParser = require('@typescript-eslint/parser');
const reactNative = require('eslint-plugin-react-native');
const globals = require('globals');
const js = require('@eslint/js');

const {
    FlatCompat,
} = require('@eslint/eslintrc');

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    extends: fixupConfigRules(compat.extends(
        'expo',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react-native/all',
        'plugin:prettier/recommended',
    )),

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 2021,
        sourceType: 'module',

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },

        globals: {
            ...reactNative.environments['react-native']['react-native'],
            ...globals.node,
        },
    },

    settings: {
        react: {
            version: 'detect',
        },
    },

    rules: {
        'react-native/no-color-literals': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'explicit-module-boundary-types': 'off',

        'no-unused-vars': ['error', {
            argsIgnorePattern: '^_',
        }],

        'react-native/no-unused-styles': 'error',
        'react-native/no-inline-styles': 'warn',
        'quotes': ['error', 'single', { avoidEscape: true }],
    },
}]);
