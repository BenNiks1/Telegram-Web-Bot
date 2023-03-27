<template>
	<nav ref="nav" class="breadcrumbs">
		<div
			v-for="(item, key) in items"
			:key="'beadcrumb-item-' + key"
			class="breadcrumbs__item"
		>
			<span
				v-if="key === items.length - 1"
				class="breadcrumbs__link default"
			>
				{{ item.name }}
			</span>
			<RouterLink
				v-else
				:to="{ path: item.path, query: route.query }"
				class="breadcrumbs__link"
			>
				{{ item.name }}
			</RouterLink>
		</div>
	</nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

const nav = ref(null);

defineProps({
	items: {
		type: Array,
		required: true,
		default: () => [],
	},
});

onMounted(() => {
	nav.value.scrollLeft = nav.value.offsetWidth;
});
</script>

<style lang="scss" scoped>
.breadcrumbs {
	display: flex;
	align-items: center;
	margin-bottom: 5px;
	overflow-x: auto;

	&::-webkit-scrollbar {
		display: none;
	}

	&__item {
		position: relative;
		flex-shrink: 0;
		padding-right: 24px;

		&::after {
			top: 50%;
			right: 10px;
			position: absolute;
			display: block;
			width: 8px;
			height: 8px;
			border: solid rgba($base-color, .8);
			border-width: 1px 1px 0 0;
			transform: translateY(-50%) rotate(45deg);
		}

		&:not(:last-child) {
			&::after {
				content: '';
			}
		}
	}

	&__link {
		color: rgba($base-color, .8);
		transition: color $transition-duration;

		&:hover:not(&.default) {
			color: $base-color;
		}

		&.default {
			cursor: default;
		}
	}
}
</style>
