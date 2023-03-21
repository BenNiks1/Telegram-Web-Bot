<template>
	<div class="row">
		<form class="form" name="TinkoffPayForm">
			<input class="form__input" type="hidden" name="terminalkey" :value="terminalkey" />
			<input class="form__input" type="hidden" name="token" :value="token" />
			<input class="form__input" type="hidden" name="password" :value="token" />

			<input class="form__input" type="hidden" name="frame" value="true" />
			<input class="form__input" type="hidden" name="language" value="ru" />
			<input
				v-model="amount"
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
			<input
				v-model="email"
				class="form__input"
				type="text"
				placeholder="E-mail"
				name="email"
				required
			/>
			<input
				v-model="phone"
				class="form__input"
				type="text"
				placeholder="Контактный телефон"
				name="phone"
				required
			/>
			<input class="tinkoffPayRow" type="hidden" name="receipt" value="" />
			<input
				class="form__input"
				type="submit"
				value="Оплатить"
				@click="(e) => tinkoffPayFunction(e)"
			/>
		</form>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const token = ref('i0h9eudl2bamushm');
const terminalkey = ref('1675421001484DEMO');
const amount = ref(100);
const phone = ref('');
const email = ref('');
const description = ref('Оплата');

onMounted(() => {
	const recaptchaScript = document.createElement('script');
	recaptchaScript.setAttribute(
		'src',
		'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js'
	);
	document.head.appendChild(recaptchaScript);
});

const tinkoffPayFunction = async (e) => {
	e.preventDefault();

	const form = e.target.parentElement;

	if (amount.value && email.value.length && phone.value.length) {
		form.receipt.value = JSON.stringify({
			Email: email.value,
			Phone: phone.value,
			EmailCompany: 'mail@mail.com',
			Taxation: 'osn',
			Items: [
				{
					Name: description.value,
					Price: amount.value + '00',
					Quantity: 1.0,
					Amount: amount.value + '00',
					PaymentMethod: 'full_prepayment',
					PaymentObject: 'service',
					Tax: 'none',
				},
			],
		});
		window.pay(form);
	} else {
		alert('Не все обязательные поля заполнены');
	}
	return false;

	// try {
	// 	await window.pay(e.target);
	// } catch (err) {
	// 	console.error(err);
	// }
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
