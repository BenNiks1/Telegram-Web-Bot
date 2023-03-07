import { formatDate, DateTimeFormatOptions } from '@/helpers';

const dates = {
  monday: '2023-03-06 10:00:00',
  wednesday: '2023-03-08 15:30:00',
  friday: '2023-03-10 22:15:00',
};

const options: DateTimeFormatOptions = {
  dateStyle: 'long',
  timeStyle: 'short',
  locales: 'ru',
};

const anotherOptions: DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  locales: 'fr-ca',
};

describe('Test formatDate method', () => {
  it('Mon is 6 of march', () => {
    expect(formatDate(dates.monday, options)).toBe('6 марта 2023 г. в 10:00');
  });

  it('Wed is 8 of march', () => {
    expect(formatDate(dates.wednesday, options)).toBe('8 марта 2023 г. в 15:30');
  });

  it('Fri is 10 of march', () => {
    expect(formatDate(dates.friday, options)).toBe('10 марта 2023 г. в 22:15');
  });

  it('Mon is 2023-03-06', () => {
    expect(formatDate(dates.friday, anotherOptions)).toBe('2023-03-10');
  });

  it('Wed is 2023-03-06', () => {
    expect(formatDate(dates.friday, anotherOptions)).toBe('2023-03-10');
  });

  it('Fri is 2023-03-10', () => {
    expect(formatDate(dates.friday, anotherOptions)).toBe('2023-03-10');
  });
});
