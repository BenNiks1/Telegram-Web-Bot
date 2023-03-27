<template>
	<TheHeader />
	<UiNotification />
	<main class="main">
		<RouterView />
	</main>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { UiNotification, TheHeader } from '@/components';
import { useHead } from '@vueuse/head';

const tg = window?.Telegram?.WebApp;

onMounted(async () => {
	if (tg) {
		tg.expand();
		tg.enableClosingConfirmation();
	}
});

useHead({
	title: 'FRESH | Сервис',
	htmlAttrs: {
		lang: 'ru'
	},
});
</script>

<style lang="scss">
.main {
	margin: 0 auto;
	padding: 20px;
	height: calc(100vh - 54px);
}
</style>
