<template>
	<section class="services">
		<UiBreadcrumbs :items="breadcrumbs" />
		<div class="services__inner">
			<h1 class="title">{{ title }}</h1>

			<div v-if="!showServices" class="type-list">
				<UiButton class="type-list__item" @click="showServices = true">
					Обслуживание и ремонт автомобиля
				</UiButton>
				<UiButton class="type-list__item">Кузовные работы и покраска</UiButton>
				<UiButton class="type-list__item">Диагностика авто перед покупкой</UiButton>
			</div>

			<div v-else-if="!isLoading" class="services__list">
				<UiAccordion
					v-for="([serviceType, services], index) in Object.entries(formatedServices)"
					:key="index"
					class="services-accordion"
					:summary="serviceType"
					:count="`${services.length} ${numWord(services.length, numWords)}`"
				>
					<UiCheckbox
						v-for="service in services"
						:key="service.id"
						v-model:checked="serviceIds"
						:value="serviceIds"
						:field-id="service.id"
					>
						<div class="services-accordion__content">
							<b>{{ service.name }}</b>
							<p>
								<b>Цена:</b>
								{{ formatNums(service.price) }}
							</p>
						</div>
					</UiCheckbox>
				</UiAccordion>

				<div class="services__button" :class="{ active: serviceIds.length }">
					<UiButton
						style-type="primary"
						:disabled="!serviceIds?.length"
						@click="nextPage"
					>
						Продолжить
					</UiButton>
				</div>
			</div>
			<UiLoader v-else />
		</div>
	</section>
</template>

<script setup>
import { ref, shallowRef, computed, inject, onMounted } from 'vue';
import { getServicesList } from '@/api';
import { UiBreadcrumbs, UiCheckbox, UiAccordion, UiButton, UiLoader } from '@/components';
import { routes, numWord, formatNums } from '@/helpers';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const route = useRoute();
const store = useStore();

const notification = inject('notification');

const isLoading = ref(false);
const showServices = ref(false);
const serviceIds = ref([]);
const formatedServices = ref({});
const servicesList = ref([]);
const numWords = shallowRef(['услуга', 'услуги', 'услуг']);
const breadcrumbs = shallowRef([routes.main, routes.dc, routes.services]);

const title = computed(() =>
	showServices.value ? 'Выберите услугу' : 'Что вас интересует?'
);

onMounted(async () => {
	const city = route.query.city;

	try {
		isLoading.value = true;
		const { data: res } = await getServicesList({ city });
		servicesList.value = res.data;
		sortServices(res.data, 'type');
	} catch (err) {
		console.error(err);
		notification({ type: 'error' });
		isLoading.value = false;
	} finally {
		isLoading.value = false;
	}
});

// Вынести отдельно
const sortServices = (list, sortBy) => {
	list.forEach((item) => {
		if (formatedServices.value?.[item[sortBy]]?.length) {
			formatedServices.value[item[sortBy]] = [
				...formatedServices.value[item[sortBy]],
				item,
			];
		} else formatedServices.value[item[sortBy]] = [item];
	});
};

const nextPage = () => {
	store.commit(
		'SET_SERVICE_LIST',
		servicesList.value.filter((service) => serviceIds.value.includes(service.id))
	);

	router.push({
		path: routes.calendar.path,
		query: { ...route.query, services: serviceIds.value },
	});
};
</script>

<style lang="scss" scoped>
.services {
	height: 100%;

	&__title {
		margin: 10px 0 20px;
		font-size: 22px;
		line-height: 30px;
		font-weight: 500;
	}

	&__list {
		padding-bottom: 100px;
	}

	.type-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		position: relative;
		list-style: none;
		margin: 0;
		padding: 0;
		z-index: 1;

		&__item {
			padding: 20px;
			background-color: $white;
			border-radius: 10px;
			transition: 0.3s;

			&:active {
				background-color: $primary;
				border-color: $primary;
				color: $white;
			}
		}
	}

	&-accordion {
		&__content {
			&:not(:last-child) {
				padding: 10px 0;
				border-bottom: 1px solid $color-border;
			}
		}
	}

	&__button {
		position: fixed;
		left: 50%;
		bottom: -100px;
		transform: translateX(-50%);
		width: calc(100vw - 40px);
		height: 42px;
		margin-bottom: 25px;
		transition: all $transition-duration;

		&.active {
			bottom: 10px;
		}
	}
}
</style>
