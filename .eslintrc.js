// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base'],
  plugins: [
    'vue'
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    'no-param-reassign': 0,
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': [2, 'always', { 'omitLastInOneLineBlock': false}],
    'comma-dangle': ['error', {
      "arrays": "never",
      "objects": "never",
      "imports": "never",
      "exports": "never",
      "functions": "ignore"
    }],
    'no-labels': 0,
    'no-restricted-syntax': 0,
    'no-unused-labels': 0,
    'no-unused-expressions': 0,
    'no-console': 0,
    'object-curly-spacing': 0,
    'camelcase': 0,
    'no-irregular-whitespace': [2, {
      'skipStrings': true,
      'skipComments': true,
      'skipRegExps': true,
      'skipTemplates': true
    }],
    'no-unused-vars': 0,
    'arrow-parens': [2, 'as-needed'],
    'no-underscore-dangle': 0,
    'arrow-body-style': ['error', 'as-needed'],
    'import/prefer-default-export': 0,
    'class-methods-use-this': 0,
    'dot-location': 0,
    'no-shadow': 0,
    'no-plusplus': 0,
    'no-prototype-builtins': 0,
    'no-unsafe-finally': 0,
    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false,
    }],
    'import/no-dynamic-require': 0,
    'no-bitwise': ['error', { 'allow': ['~'] }]
  }
}
