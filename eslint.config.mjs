// eslint.config.mjs / eslint.config.js
import nextPlugin from '@next/eslint-plugin-next';

export default [
  // 忽略目录
  {
    ignores: [
      '**/node_modules/**',
      '.next/**',
      'dist/**',
      'out/**',
    ],
  },

  // 应用于项目源码
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      // 等价于 extends: ["next/core-web-vitals"]
      ...nextPlugin.configs['core-web-vitals']
        .rules,
    },
  },
];
