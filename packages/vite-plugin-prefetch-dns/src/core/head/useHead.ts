import { Domains, DnsPluginOption } from 'src/types';
import { HTMLElement } from 'node-html-parser';
export function appendDomain2Head(domains: Domains, head: HTMLElement | null) {
  if (!head) return;
  domains.forEach((domain) => {
    const link = `<link rel="dns-prefetch" href="${domain.url}"/>`;
    head.insertAdjacentHTML('afterbegin', link);
  });
}

export function appendPreload2Head(
  head: HTMLElement | null,
  options: DnsPluginOption = {}
) {
  const { preConnects } = options;
  if (!head || !preConnects?.length) return;
  preConnects.forEach((url) => {
    const link = `<link rel="preconnect" href="${url}"/>`;
    head.insertAdjacentHTML('afterbegin', link);
  });
}
