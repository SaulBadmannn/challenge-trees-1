// @ts-check

import { test } from 'node:test';
import { strict as assert } from 'assert';
import convert from '../index.js';

test('convert', () => {
  const tree1 = [];
  const result1 = convert(tree1);
  assert.deepStrictEqual(result1, {});

  const tree2 = [['key', 'value']];
  const result2 = convert(tree2);
  assert.deepStrictEqual(result2, { key: 'value' });

  const tree3 = [['key2', 'value2'], ['key', 'value']];
  const result3 = convert(tree3);
  assert.deepStrictEqual(result3, { key: 'value', key2: 'value2' });

  const tree4 = [
    ['key2', 'value2'],
    ['anotherKey', [
      ['key2', false],
      ['innerKey', []],
    ]],
    ['key', null],
    ['anotherKey2', [
      ['wow', [['one', 'two'], ['three', 'four']]],
      ['key2', true],
    ]],
  ];

  const result4 = convert(tree4);
  assert.deepStrictEqual(result4, {
    anotherKey: {
      innerKey: {}, key2: false,
    },
    anotherKey2: {
      key2: true,
      wow: {
        one: 'two',
        three: 'four',
      },
    },
    key: null,
    key2: 'value2',
  });
});
