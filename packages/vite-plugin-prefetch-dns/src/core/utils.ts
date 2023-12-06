import { DefineFilter } from 'src/core/filter/defineFilter';
import { DnsPluginOption, Domains } from 'src/types';

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

export function filterProcess(
  domains: Domains,
  options: DnsPluginOption,
  ...args: DefineFilter[]
) {
  return args.reduce((domains, fn) => {
    return fn(domains, options);
  }, domains);
}
