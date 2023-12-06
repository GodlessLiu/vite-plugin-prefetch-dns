import { DnsPluginOption, Domains } from 'src/types';

export type DefineFilter = (
  domain: Domains,
  options: DnsPluginOption
) => Domains;

export function defineFilter(fn: DefineFilter): DefineFilter {
  return fn;
}
