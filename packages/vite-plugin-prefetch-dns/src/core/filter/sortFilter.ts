import { defineFilter } from 'src/core/filter/defineFilter';
import { DnsPluginOption, Domains } from 'src/types';

function sortByNum(domains: Domains, options: DnsPluginOption = {}) {
  return domains.sort((a, b) => b.num - a.num);
}
const sortFilter = defineFilter(sortByNum);
export default sortFilter;
