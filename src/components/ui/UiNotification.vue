<template>
	<transition name="fade">
		<dialog v-if="show" class="notification" :class="[type]">
			<div class="notification__inner" v-html="message" />
		</dialog>
	</transition>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const show = ref(false);
const message = ref('');
const type = ref('');

onMounted(() => {
	store.subscribe((mutation, state) => {
		if (mutation.type === 'SET_NOTIFICATION') {
			message.value = state.message;
			type.value = state.type;
			show.value = true;
			setTimeout(() => {
				show.value = false;
			}, state.duration);
		}
	});
});
</script>

<style lang="scss" scoped>
.notification {
	display: flex;
	align-items: center;
	grid-gap: 10px;
	position: fixed;
	max-width: 350px;
	overflow: hidden;
	box-shadow: 0 4px 20px rgba(15, 16, 17, 0.1);
	border: 1px solid $orange-deep-dark;
	background: $white;
	border-radius: 16px;
	padding: 15px 20px;
	z-index: 50;
	top: 40px;
	right: 10px;
	color: $base-color;
	opacity: 1;
	margin: 0 0 0 auto;
}

.fade-enter-active {
	transition: all 0.5s ease;
}

.fade-leave-active {
	transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter,
.fade-leave-to {
	transform: translateX(30px);
	opacity: 0;
}
</style>
