# vite-plugin-prefetch-dns

A plugin for adding prefetch dns to Vite for personal use!

# Features

- [x] 忽略特定域名
- [x] 添加pre-connect域名
- [x] 继承prettier格式化输出index.html
- [x] 添加最大限制prefetch-dns的个数（按照使用次数排序从多到少）
- [] 添加阈值
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
  /**
   * @description: 最大prefetch-dns次数
   */
  limit?: number;
   /**
   * @description: 阈值：当依赖的域名超过次数时才会被添加
   */
  threshold?: number
}
```
`DnsPluginOption.prettier` see [prettier Doc](https://prettier.io/docs/en/options)