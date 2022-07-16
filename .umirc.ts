import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'cryptography',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  // more config: https://d.umijs.org/config
  publicPath: process.env.NODE_ENV === 'production' ? '/Cryptography/' : '/',
  base: '/Cryptography',
  locales: [
    ['en-US', 'English'],
    ['zh-CN', '中文'],
  ],
  exportStatic: {},
  navs: {
    'en-US': [
      null, // A null value means to retain the conventionally generated navigation and only do incremental configuration
      {
        title: 'GitHub',
        path: 'https://github.com/istommao/Cryptography',
      },
    ],
    'zh-CN': [
      null, // A null value means to retain the conventionally generated navigation and only do incremental configuration
      {
        title: 'GitHub',
        path: 'https://github.com/istommao/Cryptography',
      },
    ],
  },
});
