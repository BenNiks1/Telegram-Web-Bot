<template>
	<li class="accordion__item">
		<div class="accordion__trigger" :class="{ active: visible }" @click="open">
			<slot name="accordion-trigger"></slot>

			<InlineSvg class="accordion__trigger-icon" src="/static/svg/arrow-down.svg" />
		</div>

		<Transition name="accordion" @enter="setHeight" @after-leave="setHeight">
			<div v-show="visible" class="accordion__content">
				<ul class="accordion__content-list">
					<slot name="accordion-content"></slot>
				</ul>
			</div>
		</Transition>
	</li>
</template>

<script setup>
import { ref, inject, computed, onMounted } from 'vue';
import InlineSvg from 'vue-inline-svg';

const count = inject('count');
const active = inject('active');

const index = ref(null);

const visible = computed(() => index.value === active.value);

const open = () => {
	if (visible.value) active.value = null;
	else active.value = index.value;
};

const setHeight = (el) => {
	el.style.height = el.scrollHeight + 'px';
};

onMounted(() => {
	index.value = count.value++;
});
</script>

<style lang="scss" scoped>
.accordion {
	$root: &;
	&__item {
		position: relative;
		cursor: pointer;
	}

	&__trigger {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 20px 10px;
		border-bottom: 1px solid $color-border;

		&-icon {
			transition: 0.3s;
		}

		&.active {
			#{$root}__trigger-icon {
				transform: rotate(180deg);
			}
		}
	}

	&__content {
		&-list {
			padding: 20px;
			list-style: none;
		}
	}

	&-enter-active,
	&-leave-active {
		will-change: height, opacity;
		transition: height 0.3s ease, opacity 0.3s ease;
		overflow: hidden;
	}

	&-enter,
	&-leave-to {
		height: 0 !important;
		opacity: 0;
	}
}
</style>
