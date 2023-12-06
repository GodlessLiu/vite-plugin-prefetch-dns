import { Plugin } from 'vite';
import urlRegex from 'url-regex';
import { parse } from 'node-html-parser';
import { format } from 'prettier';
import { DnsPluginOption, Domains } from 'src/types';
import { addDomain, filterProcess, transformUrl2Domain } from 'src/core/utils';
import Filter from './filter';
import { appendDomain2Head, appendPreload2Head } from 'src/core/head/useHead';

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
      console.log(domains);
      domains = filterProcess(
        domains,
        options,
        Filter.thresholdFilter,
        Filter.ignoreFilter,
        Filter.sortFilter,
        Filter.limitFilter
      );
      console.log(domains);
      appendDomain2Head(domains, head);
      appendPreload2Head(head, options);
      // 去掉parser的配置
      const htmlStr = format(root.toString(), {
        parser: 'html',
        ...options.prettier,
      });
      return htmlStr;
    },
  };
}
