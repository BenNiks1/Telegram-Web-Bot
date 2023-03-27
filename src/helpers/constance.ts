export const routes = {
	main: { path: '/', name: 'Главная' },
	dc: { path: '/dc', name: 'Выбор сервиса' },
	services: { path: '/services', name: 'Выбор услуги' },
	calendar: { path: '/calendar', name: 'Выбор даты' },
	slots: { path: '/slots', name: 'Выбор специалиста' },
	order: { path: '/order', name: 'Контакты' },
	checkout: { path: '/checkout', name: 'Подтверждение' },
	success: { path: '/success' },
};

export const phoneMask = '+7 (###) ###-##-##';

export const gosNumberMask = {
	mask: 'Z###ZZ###',
	tokens: {
		Z: {
			// Cyrillic and latin letters with the same glyph
			pattern: /[уУеЕнНхХвВаАрРоОсСмМтТeEtTyYoOpPaAhHkKxXcCbBmM]/,
			transform: (v: string) => v.toLocaleUpperCase(),
		},
	},
};

export const yearRegex = /^(19\d{2}|20[0-3]\d|2040)$/;
