// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const unusedImports = require('eslint-plugin-unused-imports');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: { 'unused-imports': unusedImports },
    rules: {
      'max-depth': ['warn', 4],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': [
        'error',
        {
          allow: ['error', 'warn'],
        },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variableLike',
          format: ['camelCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/member-ordering': [
        'warn',
        {
          default: [
            'signature',
            'decorated-field',
            'field',
            'constructor',
            'decorated-method',
            'method',
          ],
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': ['error'],
      '@angular-eslint/contextual-lifecycle': ['error'],
      '@angular-eslint/sort-lifecycle-methods': ['error'],
      '@angular-eslint/prefer-signals': ['error'],
      '@angular-eslint/use-injectable-provided-in': ['error'],
      '@angular-eslint/use-lifecycle-interface': ['error'],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
