module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    // 1. You must register the plugin and name it matching your rule prefixes
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin')
    },
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      // 2. Turn off the core ESLint rule for TS files to prevent double reporting
      'no-unused-vars': 'off',

      // 3. This will now resolve correctly
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          ignoreRestSiblings: true,
          ignoreUsingDeclarations: true,
          argsIgnorePattern: '^_', // Moved your underscores pattern here if needed
          varsIgnorePattern: '^_'
        }
      ],
      semi: ['warn', 'always'],
      quotes: ['warn', 'single', {avoidEscape: true}]
    }
  }
];
