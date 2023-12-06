import Filter from '../src/core/filter';
import { addDomain } from '../src/core/utils';
import { expect, describe, test } from 'vitest';

describe('happy path', () => {
  test('should add to admian when urls is not empty', () => {
    let urls = ['https://www.baidu.com', 'https://github.com'];
    let domains = addDomain([], urls);
    expect(domains).toEqual([
      {
        url: 'https://www.baidu.com',
        num: 1,
      },
      {
        url: 'https://github.com',
        num: 1,
      },
    ]);
  });
  test('should update num when url is exict', () => {
    let urls = [
      'https://www.baidu.com',
      'https://github.com',
      'https://www.baidu.com',
    ];
    let domains = addDomain([], urls);
    expect(domains).toEqual([
      {
        url: 'https://www.baidu.com',
        num: 2,
      },
      {
        url: 'https://github.com',
        num: 1,
      },
    ]);
  });
  test('threshold filter', () => {
    let domains = [
      {
        url: 'https://www.baidu.com',
        num: 2,
      },
      {
        url: 'https://github.com',
        num: 1,
      },
    ];
    domains = Filter.thresholdFilter(domains, {
      threshold: 2,
    });
    expect(domains).toEqual([
      {
        url: 'https://www.baidu.com',
        num: 2,
      },
    ]);
  });
  test('limit filter', () => {
    let domains = [
      {
        url: 'https://www.baidu.com',
        num: 2,
      },
      {
        url: 'https://github.com',
        num: 2,
      },
      {
        url: 'https://www.google.com',
        num: 1,
      },
      {
        url: 'https://www.bilibili.com',
        num: 1,
      },
      {
        url: 'https://www.zhihu.com',
        num: 1,
      },
    ];
    domains = Filter.limitFilter(domains, {
      limit: 2,
    });
    expect(domains).toEqual([
      {
        url: 'https://www.baidu.com',
        num: 2,
      },
      {
        url: 'https://github.com',
        num: 2,
      },
    ]);
  });
  test('ignores filter', () => {
    let domains = [
      {
        url: 'https://www.baidu.com',
        num: 2,
      },
      {
        url: 'https://github.com',
        num: 1,
      },
      {
        url: 'https://www.google.com',
        num: 1,
      },
    ];
    domains = Filter.ignoreFilter(domains, {
      ignores: ['https://www.baidu.com'],
    });
    expect(domains).toEqual([
      {
        url: 'https://github.com',
        num: 1,
      },
      {
        url: 'https://www.google.com',
        num: 1,
      },
    ]);
  });
});
