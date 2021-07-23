const defaultPresets = [
  ['@babel/preset-typescript', { allowNamespaces: true }],
];

const defaultIgnores = [
  '**/*.test.tsx?',
  '**/test.tsx?',
  '**/*.stories.tsx?',
  '**/stories.tsx?',
  'node_modules',
  'dist',
];

const presetsForESM = [
  [
    '@babel/preset-env',
    {
      modules: false,
    },
  ],
  ...defaultPresets,
];
const presetsForCJS = [
  [
    '@babel/preset-env',
    {
      modules: 'cjs',
    },
  ],
  ...defaultPresets,
];

const plugins = ['@babel/plugin-transform-runtime'];

module.exports = {
  env: {
    cjs: {
      ignore: defaultIgnores,
      presets: presetsForCJS,
      plugins,
    },
    esm: {
      ignore: defaultIgnores,
      presets: presetsForESM,
      plugins,
    },
  },
};
