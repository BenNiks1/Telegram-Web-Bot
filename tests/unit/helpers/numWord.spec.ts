import { numWord } from '@/helpers';

const numWords = ['услуга', 'услуги', 'услуг'];

const expectations = [
  { num: 1, expected: 'услуга' },
  { num: 2, expected: 'услуги' },
  { num: 5, expected: 'услуг' },
  { num: 11, expected: 'услуг' },
  { num: 92, expected: 'услуги' },
  { num: 100, expected: 'услуг' },
  { num: 101, expected: 'услуга' },
];

describe('Test numWords', () => {
  it.each(expectations)(
    "numWord($num, $['услуга', 'услуги', 'услуг'])-> $expected",
    ({ num, expected }) => {
      expect(numWord(num, numWords)).toBe(expected);
    }
  );
});
