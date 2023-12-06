import { defineFilter } from 'src/core/filter/defineFilter';
import { DnsPluginOption, Domains } from 'src/types';

function thresholdByNum(domains: Domains, options: DnsPluginOption) {
  const threshold = options.threshold;
  if (!threshold) return domains;
  return domains.filter((domain) => {
    return domain.num >= threshold;
  });
}

const thresholdFilter = defineFilter(thresholdByNum);

export default thresholdFilter;
