<template>
	<section class="services">
		<UiBreadcrumbs :items="breadcrumbs" />
		<div class="services__inner">
			<h1 class="title">{{ title }}</h1>

			<ul v-if="!showServices" class="type-list">
				<li class="type-list__item" @click="showServices = true">
					Обслуживание и ремонт автомобиля
				</li>
				<li class="type-list__item">Кузовные работы и покраска</li>
				<li class="type-list__item">Диагностика авто перед покупкой</li>
			</ul>

			<div v-else class="services__list">
				<UiAccordion
					v-for="([type, services], index) in Object.entries(formatedServices)"
					:key="index"
					class="services-accordion"
					:summary="type"
					:count="`${services.length} ${numWord(services.length, numWords)}`"
				>
					<div
						v-for="service in services"
						:key="service.id"
						class="services-accordion__content"
					>
						<UiCheckbox
							v-model:checked="serviceIds"
							:value="serviceIds"
							:field-id="service.id"
						>
							<b>{{ service.name }}</b>
							<p>
								<b>Цена:</b>
								{{ formatNums(service.price) }}
							</p>
						</UiCheckbox>
					</div>
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
		</div>
	</section>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue';
import { getServicesList } from '@/api';
import { UiBreadcrumbs, UiCheckbox, UiAccordion, UiButton } from '@/components';
import { routes, numWord, formatNums } from '@/helpers';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import SERVICES_MOCK from '@/mock/services.json';

const router = useRouter();
const route = useRoute();
const store = useStore();

const notification = inject('notification');

const serviceIds = ref([]);
const formatedServices = ref({});
const servicesList = ref([]);
const showServices = ref(false);
const numWords = ref(['услуга', 'услуги', 'услуг']);
const breadcrumbs = ref([routes.main, routes.dc, routes.services]);

const title = computed(() =>
	showServices.value ? 'Выберите услугу' : 'Что вас интересует?'
);

onMounted(async () => {
	try {
		// const { data: res } = await getServicesList();
		servicesList.value = SERVICES_MOCK;
		sortServices(SERVICES_MOCK, 'type');
	} catch (err) {
		console.error(err);
		notification({ type: 'error' });
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
			box-sizing: border-box;
			text-align: center;
			width: 100%;
			padding: 20px;
			background-color: $white;
			box-shadow: 0 0 10px 4px $shadow-color;
			border-radius: 10px;
			border: 1px solid #ebebeb;
			transition: 0.3s;

			&:active {
				background-color: $green;
				border-color: $green;
				color: $white;
				transition: all $transition-duration;
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
