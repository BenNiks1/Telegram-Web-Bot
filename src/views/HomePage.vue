<template>
	<section class="introduction">
		<div class="introduction__header">
			<h1 class="introduction__title">
				Добро пожаловать во
				<span class="introduction__title-additional">Fresh Сервис</span>
			</h1>
			<p class="introduction__description">
				Теперь вы можете записаться онлайн на любую услугу, выбрать время и мастера
				самостоятельно.
			</p>
		</div>

		<div class="introduction__button">
			<UiButton style-type="primary" @click="nextPage">Записаться онлайн</UiButton>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { UiButton } from '@/components';
import { routes } from '@/helpers';

const router = useRouter();

const nextPage = () => {
	router.push(routes.dc.path);
};
</script>

<style lang="scss" scoped>
.introduction {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: calc(100% - 107px);

	&__header {
		display: flex;
		flex-direction: column;
		gap: 30px;
	}

	&__title {
		display: flex;
		flex-direction: column;
		align-items: center;

		font-size: 24px;
		line-height: 30px;
		font-weight: 500;

		&-additional {
			font-weight: bold;
		}
	}

	&__description {
		text-align: center;
		color: #2b2b2b;
	}

	&__button {
		position: fixed;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		width: calc(100vw - 40px);
		margin-bottom: 25px;
	}

	@media screen and (max-height: 360px) {
		&__button {
			position: static;
			width: 100%;
			transform: none;
		}
	}
}
</style>
