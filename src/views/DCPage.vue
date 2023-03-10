<template>
	<section class="dc">
		<UiBreadcrumbs :items="breadcrumbs" />
		<div class="dc__inner">
			<h1 class="title">Выберите сервисный центр</h1>

			<UiAccordion>
				<AccordionItem
					v-for="([city, services], index) in Object.entries(serviceList)"
					:key="index"
				>
					<template #accordion-trigger>
						<h3 class="dc-accordion__title">
							{{ city }}
						</h3>
					</template>
					<template #accordion-content>
						<div
							v-for="service in services"
							:key="service.id"
							class="dc-accordion__content"
							@click="() => nextPage(service)"
						>
							<b>{{ service.city }} - {{ service.name }}</b>
							<p>Адрес: {{ service.address || '-' }}</p>
							<p>
								Часы работы с {{ service.work_time_start }} до
								{{ service.work_time_end }}
							</p>
						</div>
					</template>
				</AccordionItem>
			</UiAccordion>
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getDCList } from '@/api';
import { UiBreadcrumbs, UiAccordion, AccordionItem } from '@/components';
import { routes } from '@/helpers';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const serviceList = ref({});
const breadcrumbs = ref([routes.main, routes.dc]);

const router = useRouter();
const store = useStore();

onMounted(async () => {
	try {
		const { data: res } = await getDCList();

		sortServices(res.data, 'city');
	} catch (err) {
		console.error(err);
	}
});

// Вынести отдельно
const sortServices = (list, sortBy) => {
	list.forEach((item) => {
		if (serviceList.value?.[item[sortBy]]?.length) {
			serviceList.value[item[sortBy]] = [...serviceList.value[item[sortBy]], item];
		} else serviceList.value[item[sortBy]] = [item];
	});
};

const nextPage = (service) => {
	store.commit('SET_DC', service);

	router.push({ path: routes.services.path, query: { dealer_id: service.id } });
};
</script>

<style lang="scss" scoped>
.dc {
	height: 100%;

	&__title {
		margin: 10px 0;
		font-size: 22px;
		line-height: 30px;
		font-weight: 500;
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
