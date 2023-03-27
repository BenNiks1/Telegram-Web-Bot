<template>
	<div class="message-screen">
		<InlineSvg
			class="message-screen__icon"
			width="50"
			height="50"
			src="/static/svg/warning.svg"
			aria-label="Warning!"
		/>

		<slot />
	</div>
</template>

<script setup>
import InlineSvg from 'vue-inline-svg';
</script>

<style lang="scss" scoped>
.message-screen {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 15px;
	border-radius: 16px;
	background-color: $white;
	padding: 40px;
	text-align: center;
}
</style>
