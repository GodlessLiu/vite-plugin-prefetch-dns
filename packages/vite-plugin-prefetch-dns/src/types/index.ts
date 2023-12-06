import { type Options } from 'prettier';

export interface DnsPluginOption {
  /**
   * @description: 需要忽略的域名
   */
  ignores?: string[];
  /**
   * @description: 需要预连接的域名
   */
  preConnects?: string[];
  /**
   * @description: prettier 配置
   */
  prettier?: Omit<Options, 'parser'>;
  /**
   * @description: 限制最大prefetch次数
   */
  limit?: number;
  /**
   * @description: 阈值
   */
  threshold?: number;
}
export interface Domain {
  url: string;
  num: number;
}

export type Domains = Domain[];
