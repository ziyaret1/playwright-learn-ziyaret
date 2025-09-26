import pluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: parserTs,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: {},
        },
        plugins: {
            '@typescript-eslint': pluginTs,
            prettier: pluginPrettier,
        },
        rules: {
            'prettier/prettier': 'error',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'no-multiple-empty-lines': ['error', { max: 0, maxEOF: 1 }],
        },
    },
    {
        ignores: ['node_modules', 'dist', 'build'],
    },
];
