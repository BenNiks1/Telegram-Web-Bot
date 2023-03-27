<template>
	<section class="calendar">
		<UiBreadcrumbs :items="breadcrumbs" />
		<div v-show="!isLoading" class="calendar__inner">
			<h1 class="title">Выберите дату и время:</h1>
			<DatePicker
				v-model="date"
				mode="date"
				:available-dates="availableDates"
				:disabled-dates="disabledDates"
				:min-date="minDate"
				is-expanded
				title-position="right"
				locale="ru"
				@update:from-page="onChange"
			/>

			<UiButton
				style-type="primary"
				class="calendar__button"
				:disabled="!date"
				@click="nextStep"
			>
				Выбрать эту дату
			</UiButton>
		</div>
		<UiLoader v-show="isLoading" />
	</section>
</template>

<script setup>
import { UiBreadcrumbs, UiButton, UiLoader } from '@/components';
import { ref, shallowRef, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { routes, formatDate } from '@/helpers';
import { getDates } from '@/api';

const router = useRouter();
const route = useRoute();
const store = useStore();

const notification = inject('notification');

const date = ref(null);
const isLoading = ref(false);
const availableDates = shallowRef([]);
const breadcrumbs = shallowRef([
	routes.main,
	routes.dc,
	routes.services,
	routes.calendar,
]);

const dateOptions = {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
};

const getAvailableDates = async (params) => {
	try {
		isLoading.value = true;
		// TODO: Сделать логику пропуска выбора даты
		const { data: res } = await getDates(params);

		if(!res.data?.length) notification({ tyoe: 'error', message: 'К сожалению свободных дат нет, выберите другой месяц или услугу'})
		availableDates.value = res.data;
	} catch (error) {
		console.error(error);
		notification({ type: 'error' });
		isLoading.value = false;
	} finally {
		isLoading.value = false;
	}
};

const onChange = (e) => {
	const params = {
		dealer_id: route.query.dealer_id,
		month: `${e.year}-${getMonth(e.month)}`,
	};

	getAvailableDates(params);
};

const getMonth = (month) => {
	return month < 10 ? '0' + month : month;
};

const minDate = ref(new Date());
const disabledDates = availableDates.value ? ref([{repeat: {}},]) : ref(null);

const nextStep = () => {
	store.commit('SET_DATE', formatDate(date.value, dateOptions));

	router.push({
		path: routes.slots.path,
		query: {
			...route.query,
			date: formatDate(date.value, { dateOptions, locales: 'fr-ca' }),
		},
	});
};
</script>

<style lang="scss" scoped>
.calendar {
	height: 100%;

	&__inner {
		display: flex;
		flex-direction: column;
	}

	&__title {
		margin: 10px 0;
		font-size: 22px;
		line-height: 30px;
		font-weight: 500;
		height: 100%;
	}

	&__button {
		position: fixed;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
		width: calc(100vw - 40px);
		margin-bottom: 25px;
		align-self: end;
	}

	@media screen and (max-height: 525px) {
		&__inner {
			display: flex;
			flex-direction: column;
		}

		&__button {
			position: static;
			width: 100%;
			transform: none;
		}
	}
}
</style>
