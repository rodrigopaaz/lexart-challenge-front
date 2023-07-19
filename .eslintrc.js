module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true // Adicione esta linha
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:jest/recommended' // Adicione esta linha
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    'jest'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    indent: ['error', 2],
    'max-len': [
      'error',
      {
        code: 90,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true
      }
    ],
    'max-lines': ['off'],
    'no-magic-numbers': ['off']
  }
}
