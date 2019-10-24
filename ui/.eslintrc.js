module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // always use single quotes
    quotes: [2, 'single', { avoidEscape: true }],
    // errors when semi colon are used to close
    semi: ['error', 'never'],
    // requires commas after every available option
    'comma-dangle': [0, 'always']
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
