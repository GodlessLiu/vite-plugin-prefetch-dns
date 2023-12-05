import { Plugin } from 'vite';
import urlRegex from 'url-regex';
import { parse } from 'node-html-parser';
import { format } from 'prettier';
import { DnsPluginOption, Domains } from 'src/types';
import {
  addDomain,
  appendDomain2Head,
  limitByDesc,
  transformUrl2Domain,
} from 'src/core/utils';

export default function vitePrefetchDns(options: DnsPluginOption = {}): Plugin {
  let domains: Domains = [];
  return {
    name: 'vite-plugin-prefetch-dns',
    apply: 'build',
    transform(code: string) {
      const matchs = code.match(urlRegex({ strict: true }));
      if (matchs && matchs.length) {
        matchs.forEach((url) => {
          const urls = transformUrl2Domain(url);
          if (!urls.length) return;
          domains = addDomain(domains, urls);
        });
      }
    },
    transformIndexHtml(html) {
      const root = parse(html);
      const head = root.querySelector('head');
      domains = limitByDesc(domains, options);
      appendDomain2Head(domains, head, options);
      // 去掉parser的配置
      const htmlStr = format(root.toString(), {
        parser: 'html',
        ...options.prettier,
      });
      return htmlStr;
    },
  };
}
