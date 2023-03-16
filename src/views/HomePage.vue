<template>
	<div class="row">
		<form class="form" name="TinkoffPayForm" onsubmit="pay(this); return false;">
			<input
				class="form__input"
				type="hidden"
				name="terminalkey"
				value="TinkoffBankTest"
			/>
			<input class="form__input" type="hidden" name="frame" value="true" />
			<input class="form__input" type="hidden" name="language" value="ru" />
			<input
				class="form__input"
				type="text"
				placeholder="Сумма заказа"
				name="amount"
				required
			/>
			<input class="form__input" type="text" placeholder="Номер заказа" name="order" />
			<input
				class="form__input"
				type="text"
				placeholder="Описание заказа"
				name="description"
			/>
			<input class="form__input" type="text" placeholder="ФИО плательщика" name="name" />
			<input class="form__input" type="text" placeholder="E-mail" name="email" />
			<input
				class="form__input"
				type="text"
				placeholder="Контактный телефон"
				name="phone"
			/>
			<input class="form__input" type="submit" value="Оплатить" />
		</form>
	</div>
</template>

<script>
export default {
	name: 'SellChoose',

	head() {
		return {
			title: 'Fresh Auto: продажа',
			script: [
				{
					hid: 'stripe',
					src: 'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js',
					defer: true,
				},
			],
		};
	},
	// metaInfo: {
	// 	script: [
	// 		{
	// 			src: 'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js',
	// 			async: true,
	// 			defer: true,
	// 		},
	// 	],
	// },
};
</script>

<style lang="scss" scoped>
.form {
	display: flex;
	flex-direction: column;
	gap: 10px;

	&__input {
		padding: 10px;
		border: 1px solid $base-color;
	}
}
</style>
