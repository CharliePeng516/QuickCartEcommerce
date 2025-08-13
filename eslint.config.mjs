// eslint.config.js (或 .mjs)
import nextPlugin from '@next/eslint-plugin-next';
import globals from 'globals';

export default [
  {
    ignores: [
      '**/node_modules/**',
      '.next/**',
      'dist/**',
      'out/**',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true }, // 关键：开启 JSX 解析
      },
    },
    plugins: {
      '@next/next': nextPlugin,
    },
    // 等价于原来的 extends: ["next/core-web-vitals"]
    rules: {
      ...nextPlugin.configs['core-web-vitals']
        .rules,
    },
    settings: {
      react: { version: 'detect' }, // 让部分规则自动识别 React 版本
    },
  },
];
