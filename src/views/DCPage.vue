<template>
	<section class="dc">
		<UiBreadcrumbs :items="breadcrumbs" />
		<div v-if="!isLoading" class="dc__inner">
			<h1 class="title">Выберите сервисный центр</h1>

			<UiAccordion
				v-for="([city, services], index) in Object.entries(serviceList)"
				:key="index"
				:summary="city"
			>
				<button
					v-for="service in services"
					:key="service.id"
					class="dc-accordion__content"
					:href="service.id"
					@click="() => nextPage(service)"
				>
					<b>{{ service.name }}</b>
					<address>Адрес: {{ service.address || '-' }}</address>
					<p>
						Часы работы с
						<time :datetime="service.work_time_start">{{ service.work_time_start }}</time>
						до
						<time :datetime="service.work_time_end">{{ service.work_time_end }}</time>
					</p>
				</button>
			</UiAccordion>
		</div>
		<UiLoader v-else />
	</section>
</template>

<script setup>
import { ref, shallowRef, inject, onMounted } from 'vue';
import { getDCList } from '@/api';
import { UiBreadcrumbs, UiAccordion, UiLoader } from '@/components';
import { routes } from '@/helpers';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const notification = inject('notification');

const isLoading = ref(false);
const serviceList = ref({});
const breadcrumbs = shallowRef([routes.main, routes.dc]);

const router = useRouter();
const store = useStore();

onMounted(async () => {
	try {
		isLoading.value = true;

		const { data: res } = await getDCList();

		sortServices(res.data, 'city');
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
		if (serviceList.value?.[item[sortBy]]?.length) {
			serviceList.value[item[sortBy]] = [...serviceList.value[item[sortBy]], item];
		} else serviceList.value[item[sortBy]] = [item];
	});
};

const nextPage = (service) => {
	store.commit('SET_DC', service);

	router.push({
		path: routes.services.path,
		query: { dealer_id: service.id, city: service.city },
	});
};
</script>

<style lang="scss" scoped>
.dc {
	padding-bottom: 30px;

	&__title {
		margin: 10px 0;
		font-size: 22px;
		line-height: 30px;
		font-weight: 500;
	}

	&-accordion {
		&__content {
			text-align: start;
			&:not(:last-child) {
				padding: 10px 0;
				border-bottom: 1px solid $color-border;
			}
		}
	}
}
</style>
