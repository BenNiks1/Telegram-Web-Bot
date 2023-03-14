<template>
	<section class="slots">
		<UiBreadcrumbs :items="breadcrumbs" />
		<div class="slots__inner">
			<h1 class="title">Выбрать мастера</h1>
			<RouterLink
				:to="{ path: routes.order.path, query: route.query }"
				class="slots__next-page"
			>
				Пропустить выбор мастера
			</RouterLink>
			<ul v-if="slots?.length" class="slots__list">
				<li v-for="slot in slots" :key="slot.id" class="slots__list-item">
					<ProfileCard
						:profile-id="slot.id"
						:name="slot.name"
						:grade="slot.grade"
						:grade-count="slot.grade_count"
						:slots="slot.slots"
						@set-slot="setSlot"
					/>
				</li>
			</ul>
		</div>
	</section>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { getSlotsList } from '@/api';
import { UiBreadcrumbs, ProfileCard } from '@/components';
import { routes } from '@/helpers';
import { useRouter, useRoute, RouterLink } from 'vue-router';
import { useStore } from 'vuex';
import SLOTS_MOCK from '@/mock/slots.json';

const router = useRouter();
const route = useRoute();
const store = useStore();

const notification = inject('notification');

const slots = ref(null);
const breadcrumbs = ref([
	routes.main,
	routes.dc,
	routes.services,
	routes.calendar,
	routes.slots,
]);

onMounted(async () => {
	const { date, dealer_id } = route.query;

	try {
		// const { data: res } = await getSlotsList({ date, dealer_id });
		slots.value = SLOTS_MOCK;
	} catch (err) {
		console.error(err);
		notification({ type: 'error' });
	}
});

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
</script>

<style lang="scss" scoped>
.slots {
	height: 100%;
	position: relative;

	&__title {
		margin: 10px 0 20px;
		font-size: 22px;
		line-height: 30px;
		font-weight: 600;
	}

	&__next-page {
		display: inline-block;
		width: 100%;
		padding: 10px;
		margin-bottom: 10px;
		border: 1px solid $color-border;
		border-radius: 7px;
		text-align: center;
		background: $white;
		z-index: 1;
	}

	&__list {
		padding: 0;
		list-style: none;

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
