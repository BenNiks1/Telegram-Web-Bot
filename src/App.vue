<!-- eslint-disable vue/no-multiple-template-root -->
<template>
	<TheHeader />
	<main class="main">
		<RouterView />
	</main>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import TheHeader from '@/layout/TheHeader.vue';

const ts = window?.Telegram?.WebApp;

onMounted(async () => {
	if (ts) {
		console.log('ts', ts);
		ts.ready();
		ts.expand();
		ts.isClosingConfirmationEnabled = true;
		ts.MainButton.setParams({
			text: 'asdasdasd',
		});
		ts.viewportStableHeight = window.innerHeight;
		console.log('height', ts.viewportStableHeight);
		ts.MainButton.show();
	}
});
</script>

<style lang="scss">
.main {
	margin: 0 auto;
	padding: 20px;
	height: calc(100vh - 54px);
}
</style>
