module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import', '@typescript-eslint/eslint-plugin', 'eslint-plugin-tsdoc'],
  rules: {
    // 'comma-dangle': 0,
    'prettier/prettier': 'error',
    'import/extensions': 'off',
    'no-console': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'error',
    'tsdoc/syntax': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-unused-vars': 'warn',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // try to resolve types under '<root>@types' directory
        project: './tsconfig.json',
      },
    },
  },
};
