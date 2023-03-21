<template>
	<section class="slots">
		<UiBreadcrumbs :items="breadcrumbs" />
		<div v-if="!isLoading && masters?.length" class="slots__inner">
			<h1 class="title">{{ title }}</h1>

			<UiButton
				class="slots__set-step"
				style-type="base"
				@click="isSkipMaster = !isSkipMaster"
			>
				{{ setSteppTitle }}
			</UiButton>

			<ul class="slots__list">
				<li v-for="slot in currentMasters" :key="slot.id" class="slots__list-item">
					<ProfileCard
						:is-skip-master="isSkipMaster"
						:master="slot"
						:first-name="slot.first_name"
						:lastt-name="slot.last_name"
						:grade="slot.grade"
						:grade-count="slot.grade_count"
						:slots="slot.slots"
						@set-slot="setSlot"
					/>
				</li>
			</ul>
		</div>

		<EmptyList v-else-if="!isLoading && !masters?.length" class="slots-empty">
			<p>
				К сожалению на данную дату свободных мастеров нет. Пожалуйста, выберите другую
				дату.
			</p>
			<UiButton style-type="secondary" type="button" @click="prevPage">Назад</UiButton>
		</EmptyList>

		<UiLoader v-else />
	</section>
</template>

<script setup>
import { ref, inject, computed, shallowRef, onMounted } from 'vue';
import { getSlotsList } from '@/api';
import { UiBreadcrumbs, ProfileCard, EmptyList, UiLoader, UiButton } from '@/components';
import { routes } from '@/helpers';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const route = useRoute();
const store = useStore();

const notification = inject('notification');

const isLoading = ref(false);
const isSkipMaster = ref(false);
const masters = ref(null);
const breadcrumbs = shallowRef([
	routes.main,
	routes.dc,
	routes.services,
	routes.calendar,
	routes.slots,
]);

const currentMasters = computed(() => {
	if (isSkipMaster.value) return new Array(setMaxLengthSlot(masters.value)[0]);
	else return masters.value;
});

const title = computed(() => (isSkipMaster.value ? 'Выбрать время' : 'Выбрать мастера'));

const setSteppTitle = computed(() =>
	isSkipMaster.value ? 'Выбрать мастера' : 'Пропустить выбор мастера'
);

onMounted(async () => {
	const { date, dealer_id } = route.query;

	try {
		isLoading.value = true;
		const { data: res } = await getSlotsList({ date, dealer_id });
		masters.value = res.data;
	} catch (err) {
		console.error(err);
		notification({ type: 'error' });
		isLoading.value = false;
	} finally {
		isLoading.value = false;
	}
});

// При пропуске выбора мастре, выбирается мастер с наибольшим кол-вом свободного времени
const setMaxLengthSlot = (masters) => {
	return masters?.sort((a, b) => b.slots.length - a.slots.length);
};

const calculateTime = (time, minutes = 30) => {
	const parts = time.split(':');
	const formatedTime = parts[0] * 3600 + parts[1] * 60;
	const newTime = formatedTime + minutes * 60;

	const result = [
		Math.floor(newTime / 3600), // HOURS
		Math.floor((newTime % 3600) / 60), // MINUTES
	]
		.map((v) => (v < 10 ? '0' + v : v))
		.join(':');

	return result;
};

const setSlot = (slot) => {
	store.commit('SET_MASTER', slot);
	store.commit('SET_DATE', `${route.query.date} ${slot.time}`);

	const query = {
		master_id: slot.master_id,
		start_at: `${route.query.date} ${slot.time}`,
		end_at: `${route.query.date} ${calculateTime(slot.time)}`,
	};
	router.push({ path: routes.order.path, query: { ...route.query, ...query } });
};

const prevPage = () => {
	router.push({ path: routes.calendar.path, query: route.query });
};
</script>

<style lang="scss" scoped>
.slots {
	height: 100%;
	position: relative;

	&-empty {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin: 30px 0;
	}

	&__title {
		margin: 10px 0 20px;
		font-size: 22px;
		line-height: 30px;
		font-weight: 600;
	}

	&__set-step {
		margin-bottom: 10px;
		border: 1px solid $primary;
		background: $white;
	}

	&__list {
		padding: 0;
		list-style: none;
		padding-bottom: 40px;

		&-item {
			&:not(:last-child) {
				border-bottom: 1px solid $color-border;
				padding-bottom: 15px;
				margin-bottom: 15px;
			}
		}
	}
}
</style>
