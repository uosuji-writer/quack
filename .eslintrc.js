module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: [
    'packages/app/dist',
    'packages/app/android',
    'packages/app2/dist',
    'packages/app2/android',
    'chat.config.js',
  ],
  overrides: [
    {
      files: [
        'packages/app/src/sw.js',
        'packages/app/src/fcm-sw.js',
        'packages/app2/src/sw.js',
        'packages/app2/src/fcm-sw.js',
      ],
      env: {
        serviceworker: true,
        browser: true,
        es2021: true,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        self: 'readonly',
        cache: 'readonly',
      },
      rules: {
        'no-restricted-globals': ['off'],
        'import/extensions': ['off'],
      },
    },
    {
      files: [
        'packages/app/tests/**/*.js',
        'packages/app2/tests/**/*.js',
        'packages/app2/**/*.spec.js',
      ],
      env: {
        mocha: true,
        browser: true,
        es2021: true,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        chai: 'readonly',
      },
      rules: {
        'import/extensions': ['off'],
        'no-unused-expressions': 'off',
      },
    },
    {
      files: [
        'packages/server/tests/**/*.js',
      ],
      env: {
        mocha: true,
        commonjs: true,
        es2021: true,
      },
      rules: {
        'global-require': ['off'],
      },
    },
    {
      files: [
        'packages/app/**/*.js',
        'packages/app2/**/*.js',
      ],
      extends: 'preact',
      env: {
        browser: true,
        es2021: true,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        Quill: 'readonly',
        QuillEmoji: 'readonly',
        EMOJI: 'writable',
      },
      rules: {
        'jest/no-deprecated-functions': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': ['off'],
      },
    },
  ],
  rules: {
    'no-await-in-loop': 'off',
    'consistent-return': 'off',
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    indent: [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    quotes: [
      'error',
      'single',
    ],
    semi: [
      'error',
      'always',
    ],
  },
};
