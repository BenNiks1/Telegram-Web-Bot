export const formatNums = (number: number | string, showCurrency = true) => {
	const value = Number(number);
	let options;

	if (isNaN(value)) {
		return number;
	}

	if (showCurrency) {
		options = {
			style: 'currency',
			currency: 'RUB',
			minimumFractionDigits: 0,
		};
	}

	return value.toLocaleString('ru-RU', options);
};
