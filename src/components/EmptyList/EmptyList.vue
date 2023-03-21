<template>
	<div class="empty-list">
		<InlineSvg
			class="empty-list__icon"
			width="50"
			height="50"
			src="/static/svg/warning.svg"
		/>

		<slot />
	</div>
</template>

<script setup>
import InlineSvg from 'vue-inline-svg';
</script>

<style lang="scss" scoped>
.empty-list {
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
