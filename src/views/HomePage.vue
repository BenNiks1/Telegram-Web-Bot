<template>
	<div class="row">
		<form class="form" name="TinkoffPayForm" onsubmit="pay(this);return false">
			<input class="form__input" type="hidden" name="terminalkey" :value="terminalkey" />
			<input class="form__input" type="hidden" name="token" :value="token" />
			<input class="form__input" type="hidden" name="password" :value="token" />

			<input class="form__input" type="hidden" name="frame" value="true" />
			<input class="form__input" type="hidden" name="language" value="ru" />
			<input
				class="form__input"
				type="text"
				placeholder="Сумма заказа"
				name="amount"
				:value="amount"
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

<script setup>
import { onMounted, ref } from 'vue';

const token = ref('i0h9eudl2bamushm');
const terminalkey = ref('1675421001484DEMO');
const amount = ref(100);

onMounted(() => {
	const recaptchaScript = document.createElement('script');
	recaptchaScript.setAttribute(
		'src',
		'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js'
	);
	document.head.appendChild(recaptchaScript);
});
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
