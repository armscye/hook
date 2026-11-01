import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import jsdoc from 'eslint-plugin-jsdoc';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  globalIgnores(['dist/', 'coverage/', 'CHANGELOG.md']),
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // Require JSDoc on everything the package exports.
    files: ['src/**/*.ts'],
    ignores: ['src/**/*.test-d.ts', 'src/**/*.test.ts'],
    extends: [jsdoc.configs['flat/recommended-typescript-error']],
    settings: {
      // TSDoc spelling, understood by TypeScript, TypeDoc and editors.
      jsdoc: { tagNamePreference: { template: 'typeParam' } },
    },
    rules: {
      'jsdoc/require-jsdoc': [
        'error',
        {
          publicOnly: true,
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true,
          },
          contexts: [
            'TSInterfaceDeclaration',
            'TSTypeAliasDeclaration',
            'TSEnumDeclaration',
            'ExportNamedDeclaration > VariableDeclaration',
          ],
        },
      ],
      'jsdoc/require-description': 'error',
      'jsdoc/require-example': [
        'error',
        {
          contexts: [
            'ExportNamedDeclaration > TSInterfaceDeclaration',
            'ExportNamedDeclaration > TSTypeAliasDeclaration',
          ],
        },
      ],
      'jsdoc/check-tag-names': ['error', { typed: true }],
      'jsdoc/tag-lines': ['error', 'any', { startLines: 1 }],
    },
  },
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  prettier,
);
