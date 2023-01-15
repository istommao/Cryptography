import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'cryptography',
  favicon: 'https://t.codingcat.top/static/imgs/logo.png',
  logo: 'https://t.codingcat.top/static/imgs/logo.png',
  outputPath: 'docs-dist',
  mode: 'site',
  // more config: https://d.umijs.org/config
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  base: '/',
  locales: [
    ['en-US', 'English'],
    ['zh-CN', '中文'],
  ],
  analytics: {
    // 百度统计代码，配置后会启用
    baidu: 'bd4f0366bf16042bba6c02072ead174d',
  },
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
