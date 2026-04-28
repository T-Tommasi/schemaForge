module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': ['off'],
    'import/extensions': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    'import/prefer-default-export': ['off'],
    'no-restricted-syntax': ['off'],
    'no-tabs': ['off'],
    'prefer-destructuring': ['off'],
    'radix': ['off'],
    'comma-dangle': ['off'],
    'eol-last': ['error'],
    'max-len': ['off'],
  },
  ignorePatterns: ['dist/', 'node_modules/', 'test.ts'],
};
