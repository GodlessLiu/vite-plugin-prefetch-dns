import { defineFilter } from 'src/core/filter/defineFilter';
import { DnsPluginOption, Domains } from 'src/types';

function limitByDesc(domains: Domains, options: DnsPluginOption = {}) {
  if (!options.limit) return domains;
  return domains.slice(0, options.limit);
}
const limitFilter = defineFilter(limitByDesc);
export default limitFilter;
