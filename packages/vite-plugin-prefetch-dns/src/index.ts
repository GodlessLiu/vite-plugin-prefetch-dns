import { Plugin } from "vite";
import urlRegex from "url-regex";
import { parse, type HTMLElement } from "node-html-parser";
import { format, type Options } from "prettier";

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
export default function vitePrefetchDns(option: DnsPluginOption = {}): Plugin {
  const { ignores = [], preConnect = [] } = option;
  function transformUrl2Domain(url: string) {
    const domain = url.match(/(https?:\/\/[^/]*)/g);
    return domain || [];
  }
  function addDomain2Head(domains: Set<string>, head: HTMLElement | null) {
    if (!head) return;
    domains.forEach((domain) => {
      if (ignores?.length && ignores.includes(domain)) return;
      const link = `<link rel="dns-prefetch" href="${domain}">`;
      head.insertAdjacentHTML("afterbegin", link);
    });
    if (preConnect?.length) {
      const preConnects = Array.isArray(preConnect) ? preConnect : [preConnect];
      preConnects.forEach((d) => {
        const link = `<link rel="preconnect" href="${d}">`;
        head.insertAdjacentHTML("afterbegin", link);
      });
    }
  }
  let domains: Set<string> = new Set<string>();
  return {
    name: "vite-plugin-prefetch-dns",
    apply: "build",
    transform(code: string) {
      const matchs = code.match(urlRegex({ strict: true }));
      if (matchs && matchs.length) {
        matchs.forEach((url) => {
          const domain = transformUrl2Domain(url);
          if (!domain.length) return;
          domain.forEach((d) => {
            domains.add(d);
          });
        });
      }
    },
    transformIndexHtml(html) {
      const root = parse(html);
      const head = root.querySelector("head");
      addDomain2Head(domains, head);
      // 去掉parser的配置
      const htmlStr = format(root.toString(), {
        parser: "html",
        ...option.prettier,
      });
      return htmlStr;
    },
  };
}
