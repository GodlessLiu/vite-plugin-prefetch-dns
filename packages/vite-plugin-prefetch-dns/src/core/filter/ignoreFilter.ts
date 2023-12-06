import { defineFilter } from 'src/core/filter/defineFilter';
import { DnsPluginOption, Domains } from 'src/types';

function ignoreByArray(domains: Domains, options: DnsPluginOption = {}) {
  const ignores = options.ignores;
  if (!ignores) return domains;
  return domains.filter((domain) => {
    return !ignores.includes(domain.url);
  });
}

const ignoreFilter = defineFilter(ignoreByArray);

export default ignoreFilter;
