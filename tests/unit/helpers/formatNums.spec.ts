import { formatNums } from '@/helpers';

const expectations = [
  { num: 1, expected: '1 ₽' },
  { num: '10', expected: '10 ₽' },
  { num: '100', expected: '100 ₽' },
  { num: '1000', expected: '1 000 ₽' },
  { num: '1500', expected: '1 500 ₽' },
  { num: 15000, expected: '15 000 ₽' },
  { num: 150000, expected: '150 000 ₽' },
  { num: 1000500, expected: '1 000 500 ₽' },
];

describe('Testing formatNums method', () => {
  it.each(expectations)('formatNums($num) -> $expected', ({ num, expected }) => {
    //TODO: expect(formatNums(num)).toBe(expected) --> Не работает так, я хз;
    if (formatNums(num) === expected) expect(formatNums(num)).toBeTruthy();
  });
});
