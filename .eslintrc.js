module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'import/no-duplicates': 'error',
    complexity: ['error', 8],
    'max-lines': ['error', 200],
    'max-depth': ['error', 3],
    'max-params': ['error', 4],
    eqeqeq: ['error', 'smart'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'no-shadow': 'off',
    'prefer-const': 'error',
    'import/order': [
      'error',
      {
        pathGroups: [],
        groups: [
          ['external', 'builtin'],
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
    'no-restricted-imports': [
      'error',
      // Lodash tree shaking isn't working so directly importing lodash results in importing the whole library.
      // This rule should prevent importing the whole lodash library.
      // https://lodash.com/per-method-packages
      {
        paths: [
          {
            name: 'lodash',
            message: 'Please use lodash/{module} import instead',
          },
          { name: '.', message: 'Please use explicit import file' },
        ],
      },
    ],
  },
  plugins: ['import', 'prefer-arrow'],
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        '@typescript-eslint/prefer-optional-chain': 'error',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/strict-boolean-expressions': 'error',
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-ignore': 'allow-with-description',
            minimumDescriptionLength: 10,
          },
        ],
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-member-accessibility': 0,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/interface-name-prefix': 0,
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/ban-types': 'error',
      },
    },
  ],
};
