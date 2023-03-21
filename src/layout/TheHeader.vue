<template>
	<header class="header">
		<RouterLink to="/">
			<InlineSvg class="header__logo" src="/static/svg/new_logo.svg" />
		</RouterLink>
	</header>
</template>

<script setup>
import InlineSvg from 'vue-inline-svg';
import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	padding: 15px;

	&__logo {
		margin-top: 5px;
	}

	&__contact {
		display: flex;
		align-items: center;
		gap: 10px;

		&-icon {
			display: block;
		}
	}
}
</style>
