import { DnsPluginOption, Domains } from 'src/types';
import { HTMLElement } from 'node-html-parser';
export function transformUrl2Domain(url: string) {
  const domain = url.match(/(https?:\/\/[^/]*)/g);
  return domain || [];
}

export function addDomain(domains: Domains, urls: string[]): Domains {
  urls.forEach((url) => {
    const index = domains.findIndex((d) => d.url === url);
    if (index !== -1) {
      domains[index].num += 1;
    } else {
      domains.push({
        url,
        num: 1,
      });
    }
  });
  return domains;
}

export function limitByDesc(domains: Domains, options: DnsPluginOption = {}) {
  if (!options.limit) return domains;
  return domains.sort((a, b) => b.num - a.num).slice(0, options.limit);
}

export function appendDomain2Head(
  domains: Domains,
  head: HTMLElement | null,
  options: DnsPluginOption = {}
) {
  const { ignores, preConnects = [] } = options;
  if (!head) return;
  domains.forEach((domain) => {
    if (ignores?.length && ignores.includes(domain.url)) return;
    const link = `<link rel="dns-prefetch" href="${domain.url}">`;
    head.insertAdjacentHTML('afterbegin', link);
  });

  if (preConnects?.length) {
    preConnects.forEach((d) => {
      const link = `<link rel="preconnect" href="${d}">`;
      head.insertAdjacentHTML('afterbegin', link);
    });
  }
}
