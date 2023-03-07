/**
 * Форматирование даты
 * получает дату в формате ISO 8601
 * @param{string} - date
 * @example 2022-06-29 10:14:23.980873+00:00
 * @param{object} - options
 * возвращает отформатированую дату
 * @returns{string}
 * @example 29 декабря, 17:29:44
 */

export interface DateTimeFormatOptions extends Intl.DateTimeFormatOptions {
  locales?: string;
}

export const formatDate = (date: string, options: DateTimeFormatOptions) => {
  const newDate = new Date(date);
  const formater = new Intl.DateTimeFormat(options?.locales || 'ru', options);
  return formater.format(newDate);
};
