# vite-plugin-prefetch-dns

A plugin for adding prefetch dns to Vite for personal use!

# Features

- [x] 忽略特定域名
- [x] 添加pre-connect域名
- [x] 继承prettier格式化输出index.html


```typescript
interface DnsPluginOption {
  /**
   * @description: 需要忽略的域名
   */
  ignores?: string[];
  /**
   * @description: 需要预连接的域名
   */
  preConnect?: string[] | string;
  /**
   * @description: prettier 配置
   */
  prettier?: Omit<Options, "parser">;
}
```
`DnsPluginOption.prettier` see [prettier Doc](https://prettier.io/docs/en/options)

