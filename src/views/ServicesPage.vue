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

			<UiAccordion v-if="showServices">
				<AccordionItem
					v-for="([type, services], index) in Object.entries(formatedServices)"
					:key="index"
					class="services-accordion"
				>
					<template #accordion-trigger>
						<h3 class="services-accordion__title">
							{{ type }}
							<span>
								{{ `${services.length} ${numWord(services.length, numWords)}` }}
							</span>
						</h3>
					</template>
					<template #accordion-content>
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
					</template>
				</AccordionItem>
			</UiAccordion>

			<div v-if="showServices" class="services__button">
				<UiButton style-type="primary" :disabled="!serviceIds?.length" @click="nextPage">
					Продолжить
				</UiButton>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getServicesList } from '@/api';
import {
	UiBreadcrumbs,
	UiAccordion,
	AccordionItem,
	UiCheckbox,
	UiButton,
} from '@/components';
import { routes, numWord, formatNums } from '@/helpers';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import SERVICES from '@/mock/services.json';

const router = useRouter();
const route = useRoute();
const store = useStore();

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
		servicesList.value = SERVICES;
		sortServices(SERVICES, 'type');
	} catch (err) {
		console.error(err);
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
		'STORE_SERVICES',
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

	&__button {
		position: fixed;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
		width: calc(100vw - 40px);
		height: 42px;
		margin-bottom: 25px;
	}

	&-accordion {
		&__content {
			display: block;
			margin-left: 20px;
			padding: 0 0 10px 20px;
			border-bottom: 1px solid $color-border;
		}

		&__title {
			font-size: 20px;
			font-weight: bold;

			span {
				font-size: 16px;
				font-weight: normal;
				color: $color-text-secondary-contrast;
			}
		}
	}
}
</style>
