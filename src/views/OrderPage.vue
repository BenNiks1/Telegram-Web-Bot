<template>
	<section class="order">
		<UiBreadcrumbs :items="breadcrumbs" />

		<form v-if="!isError" class="form" @submit.prevent="onCheck">
			<div class="form__section">
				<h2 class="title">{{ title }}</h2>
				<div v-if="!isSubmit" class="form__user-data">
					<UiInput
						id="name"
						v-model="formData.name.value"
						placeholder="Иванова Анастасия"
						:label="formData.name.label"
						type="text"
						name="name"
						:is-error="!!errors.name"
						:text-error="errors?.name"
						required
					/>

					<UiInput
						id="phone"
						v-model="formData.phone.value"
						v-maska="phoneMask"
						placeholder="+7 (999) 888 77 66"
						:label="formData.phone.label"
						type="text"
						name="phone"
						:is-error="!!errors.phone"
						:text-error="errors?.phone"
						required
					/>

					<UiInput
						id="mark"
						v-model="formData.mark.value"
						placeholder="Renault"
						:label="formData.mark.label"
						type="text"
						name="mark"
						:is-error="!!errors.mark"
						:text-error="errors?.mark"
					/>
					<UiInput
						id="model"
						v-model="formData.model.value"
						placeholder="Logan"
						:label="formData.model.label"
						type="text"
						name="model"
						:is-error="!!errors.model"
						:text-error="errors?.model"
					/>
					<UiInput
						id="carYear"
						v-model="formData.carYear.value"
						placeholder="2020"
						:label="formData.carYear.label"
						type="number"
						name="carYear"
						:is-error="!!errors.carYear"
						:text-error="errors?.carYear"
					/>
					<UiInput
						id="carNumber"
						v-model="formData.carNumber.value"
						v-maska="gosNumberMask"
						placeholder="A123АA456"
						:label="formData.carNumber.label"
						type="text"
						name="carNumber"
						:is-error="!!errors.carNumber"
						:text-error="errors?.carNumber"
					/>
					<UiInput
						id="carMileage"
						v-model="formData.carMileage.value"
						placeholder="120000"
						:label="formData.carMileage.label"
						type="number"
						name="carMileage"
						:is-error="!!errors.carMileage"
						:text-error="errors?.carMileage"
					/>
				</div>

				<CheckoutCard v-else :checkout-data="checkoutData" />
			</div>

			<div v-if="!isSubmit" class="form__check">
				<UiButton style-type="primary" type="submit" @click="onCheck">
					Продолжить
				</UiButton>
			</div>

			<div v-else class="form__submit">
				<UiButton style-type="secondary" type="button" @click="isSubmit = false">
					Назад
				</UiButton>
				<UiButton
					style-type="primary"
					type="button"
					:loading="isLoading"
					@click.prevent="submit"
				>
					Подтвердить
				</UiButton>

				<p class="form__submit-description">
					Нажимая на кнопку "Подтвердить" вы даете согалсие на обработку персональных
					данных
				</p>
			</div>
		</form>

		<MessageScreen v-else class="form__error">
			<p>К сожалению на данное время выбранный мастер уже занят.</p>
			<UiButton
				style-type="secondary"
				type="button"
				:to="{ path: routes.calendar.path, query: route.query }"
			>
				Назад
			</UiButton>
		</MessageScreen>
	</section>
</template>

<script setup>
import {
	UiBreadcrumbs,
	UiButton,
	UiInput,
	CheckoutCard,
	MessageScreen,
} from '@/components';
import { ref, shallowRef, computed, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { routes, phoneMask, gosNumberMask, yearRegex } from '@/helpers';

import { postOrder } from '@/api';

const router = useRouter();
const route = useRoute();

const notification = inject('notification');

const isSubmit = ref(false);
const isLoading = ref(false);
const isError = ref(false);

const formData = ref({
	phone: { label: 'Телефон', value: null },
	name: { label: 'Фамилия и Имя', value: null },
	mark: { label: 'Марка авто', value: null },
	model: { label: 'Модель авто', value: null },
	carYear: { label: 'Год выпуска', value: null },
	carNumber: { label: 'Госномер авто', value: null },
	carMileage: { label: 'Пробег, км', value: null },
});
const errors = ref({});

const checkoutData = shallowRef([]);
const breadcrumbs = shallowRef([
	routes.main,
	routes.dc,
	routes.services,
	routes.calendar,
	routes.slots,
	routes.order,
]);

const title = computed(() => (isSubmit.value ? 'Чек' : 'Заполните данные'));

const submit = async () => {
	const { name, phone, mark, model, carYear, carNumber, carMileage } = formData.value;
	const data = {
		client_name: name.value,
		client_phone: phone.value?.replace(/[\D]/g, ''),
		car_mark: mark.value,
		car_model: model.value,
		car_year: carYear.value,
		car_number: carNumber.value,
		car_mileage: carMileage.value,
		services: [...route.query.services],
		...route.query,
	};

	try {
		isLoading.value = true;
		await postOrder(data);
		router.push(routes.success.path);
	} catch (error) {
		if (error.response.status === 409) isError.value = true;
		else {
			console.error(error);
			notification({ type: 'error' });
		}

		isLoading.value = false;
	} finally {
		isLoading.value = false;
	}
};

const isEmpty = (data) => {
	return Object.entries(data)
		.map(([, value]) => value.value?.length && value)
		.filter((x) => x);
};

const onCheck = () => {
	if (validate(formData.value)) {
		checkoutData.value = [...isEmpty(formData.value)];
		isSubmit.value = true;
	} else notification({ type: 'error', message: 'Некорректно заполненая форма' });
};

const validate = (data) => {
	const { name, phone, carYear } = data;

	errors.value = {};
	if (!name.value) {
		errors.value.name = 'ФИО является обязательным полем';
	}

	if (!phone.value) {
		errors.value.phone = 'Телефон является обязательным полем';
	} else if (phone.value.length < 11) {
		errors.value.phone = 'Телефон должен быть не менее 11 символов';
	}

	if (carYear.value && !yearRegex.test(carYear.value)) {
		errors.value.carYear = 'Некорректно указанный год';
	}

	if (Object.keys(errors.value).length > 0) {
		return false;
	}

	return true;
};
</script>

<style lang="scss">
.order {
	& .form {
		display: grid;
		grid-template-rows: 1fr minmax(100px, max-content);
		height: 100%;

		&__error {
			margin: 30px 0;
		}

		&__title {
			font-size: 16px;
			line-height: 24px;
			font-weight: bold;
		}

		&__section {
			display: flex;
			flex-direction: column;
			gap: 15px;
			margin-bottom: 20px;
		}

		&__user-data {
			display: flex;
			flex-direction: column;
			gap: 20px;
		}

		&__radio-buttons {
			display: flex;
			flex-direction: column;
			gap: 10px;
			position: relative;
			width: 100%;
			z-index: 10;

			&-inner {
				label {
					display: block;
					width: 100%;
					background-color: $white;
					border: 1px solid $color-border;
					padding: 10px 14px;
					border-radius: 10px;
					cursor: pointer;
					color: $base-color;
					box-shadow: 0 2px 5px 0 rgb(151 165 193 / 20%),
						0 2px 10px 0 rgb(151 165 193 / 20%);
				}

				input[type='radio'] {
					position: absolute !important;
					clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
					clip: rect(1px, 1px, 1px, 1px);
					padding:0 !important;
					border:0 !important;
					height: 1px !important;
					width: 1px !important;
					overflow: hidden;
				}

				input[type='radio']:checked + label {
					background: $primary;
					color: $white;
					border-color: $blue;
				}
			}
		}
		&__submit {
			display: flex;
			flex-direction: column;
			gap: 10px;
			margin-bottom: 30px;
		}

		&__check,
		&__submit {
			height: 100%;

			&-description {
				font-size: 12px;
				color: rgba($base-color, .8);
				text-align: center;
			}
		}
	}
}
</style>
