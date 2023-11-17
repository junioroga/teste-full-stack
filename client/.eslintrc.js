/* eslint-disable no-undef */
module.exports = {
  root: true,
  extends: ['universe', 'universe/shared/typescript-analysis'],
  plugins: ['react-hooks', 'simple-import-sort'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-restricted-imports': [
      'error',
      {
        name: 'lodash',
        message: 'Please import submodules instead of the full lodash package.',
      },
      {
        name: 'date-fns',
        message:
          'Please import submodules instead of the full date-fns package.',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'always',
        semi: false,
        endOfLine: 'auto',
      },
    ],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000', '^react', '^react-native'],
          ['^@?\\w', '^react-native-?\\w'],
          ['^expo?\\w'],
          [
            '^@assets',
            '^@components',
            '@config',
            '^@navigation',
            '^@pages',
            '^@services',
            '^@utils',
          ],
          ['^\\.'],
          ['~?\\w'],
          ['\\./styles'],
        ],
      },
    ],
    'import/order': ['off'],
  },
  settings: {
    'babel-plugin-root-import': {
      rootPathPrefix: '~',
      rootPathSuffix: 'src',
    },
  },
}
