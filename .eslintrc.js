const path = require('path');
module.exports = {
  env: {
    jest: true,
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'no-tabs': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-first-prop-new-line': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-max-props-per-line': 'off',
    'import/no-named-as-default': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'react/no-array-index-key': 'off',
    'object-curly-newline': 'off',
    'jsx-a11y/anchor-is-valid': 'off', // invalid - <Link> autopasses href
    'indent': ['error', 'tab'],
    'react/jsx-indent': ['error', 'tab'],
    'react/jsx-indent-props': ['error', 'tab'],
    'max-len': ['error', { code: 120 }],
    'jsx-a11y/click-events-have-key-events': ['warn'],
    'jsx-a11y/no-static-element-interactions': ['warn'],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx', '.svg'] }],
    'import/no-unresolved': 'error',
    'no-multiple-empty-lines': ['error', {
      max: 1,
      maxEOF: 1,
    }],
    'import/extensions': ['error', {
      svg: 'always',
      json: 'always',
      css: 'always',
      js: 'never',
      ts: 'never',
      tsx: 'never',
      jsx: 'never',
    }],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['src','node_modules'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  overrides: [
    {
      files: ['**/*.d.ts'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
