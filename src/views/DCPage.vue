<template>
	<section class="dc">
		<UiBreadcrumbs :items="breadcrumbs" />
		<div class="dc__inner">
			<h1 class="title">Выберите сервисный центр</h1>

			<UiAccordion
				v-for="([city, services], index) in Object.entries(serviceList)"
				:key="index"
				:summary="city"
			>
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
			</UiAccordion>
		</div>
	</section>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { getDCList } from '@/api';
import { UiBreadcrumbs, UiAccordion } from '@/components';
import { routes } from '@/helpers';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import DC_MOCK from '@/mock/dc.json';

const notification = inject('notification');

const serviceList = ref({});
const breadcrumbs = ref([routes.main, routes.dc]);

const router = useRouter();
const store = useStore();

onMounted(async () => {
	try {
		// const { data: res } = await getDCList();

		sortServices(DC_MOCK, 'city');
	} catch (err) {
		console.error(err);
		notification({ type: 'error' });
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
			&:not(:last-child) {
				padding: 10px 0;
				border-bottom: 1px solid $color-border;
			}
		}
	}
}
</style>
