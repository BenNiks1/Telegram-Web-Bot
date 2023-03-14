<template>
	<section class="calendar">
		<UiBreadcrumbs :items="breadcrumbs" />
		<div class="calendar__inner">
			<h1 class="title">Выберите дату и время:</h1>

			<DatePicker
				v-model="date"
				mode="date"
				:available-dates="availableDates"
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
	</section>
</template>

<script setup>
import { UiBreadcrumbs, UiButton } from '@/components';
import { ref, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { routes, formatDate } from '@/helpers';
import { getDates } from '@/api';

const router = useRouter();
const route = useRoute();
const store = useStore();

const notification = inject('notification');

const date = ref(null);
const availableDates = ref([]);
const breadcrumbs = ref([routes.main, routes.dc, routes.services, routes.calendar]);

const getAvailableDates = async (params) => {
	try {
		// const { data: res } = await getDates(params);
		// availableDates.value = res.data;
	} catch (error) {
		console.error(error);
		notification({ type: 'error' });
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

const nextStep = () => {
	store.commit('SET_DATE', date.value);

	const options = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		locales: 'fr-ca',
	};
	router.push({
		path: routes.slots.path,
		query: { ...route.query, date: formatDate(date.value, options) },
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
		height: 42px;
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
