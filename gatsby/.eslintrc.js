module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    es2020: true,
  },
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  settings: {
    react: {
        version: "detect"
    }
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'import'
  ],
  rules: {
    'camelcase': 'off',
    'comma-dangle': [2, {
      'objects': 'always-multiline',
      'arrays': 'always-multiline',
      'functions': 'never',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
    }],
    'no-undef': 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': 'off',
    'no-unused-expressions': 'off',
    'semi': [ 2, 'never'],
    'space-before-function-paren': [2, {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always',
    }],
    '@typescript-eslint/naming-convention': [2,
      { selector: 'default', format: ['camelCase'], leadingUnderscore: 'allow', trailingUnderscore: 'allow' },
      { selector: 'variable', format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'], leadingUnderscore: 'allow', trailingUnderscore: 'allow' },
      { selector: 'typeLike', format: ['PascalCase'] },
      { selector: 'typeAlias', format: ['PascalCase', 'camelCase'] },
      { selector: 'property', format: ['camelCase', 'snake_case'] },
      { selector: 'function', format: ['camelCase', 'PascalCase'] },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/member-delimiter-style': [2, {
      'multiline': {
        delimiter: 'semi',
      }
    }],
    '@typescript-eslint/no-empty-function': [1],
    '@typescript-eslint/no-explicit-any': [0],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': [2, {
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_',
    }],
    '@typescript-eslint/no-unused-expressions': [2],
    '@typescript-eslint/no-use-before-define': [2],
    'import/first': [2],
    'import/order': [2, {
      'groups': ['builtin', 'external', 'parent', 'sibling'],
      'newlines-between': 'always-and-inside-groups',
      'alphabetize': { 'order': 'asc', 'caseInsensitive': true },
    }],
    'react/prop-types': [0],
  },
}
