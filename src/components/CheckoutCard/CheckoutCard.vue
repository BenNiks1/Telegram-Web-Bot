<template>
	<section class="checkout">
		<div class="checkout__inner">
			<div class="wrapper">
				<dl class="check">
					<div class="check-wrapper">
						<dt>Дата и время</dt>
						<dd class="check-data">{{ store.state.date }}</dd>
					</div>

					<div class="check-wrapper">
						<dt>Сервис</dt>
						<dd class="check-data">{{ store.state.dc.name }}</dd>
					</div>

					<div class="check-wrapper">
						<dt>Адрес</dt>
						<dd class="check-data">{{ store.state.dc.address }}</dd>
					</div>

					<div class="check-wrapper">
						<dt>Местер</dt>
						<dd class="check-data">{{ store.state.master.name }}</dd>
					</div>

					<UiDelimiter type="dotted" />

					<div v-for="(data, index) in checkoutData" :key="index" class="check-wrapper">
						<dt>{{ data.label }}</dt>
						<dd class="check-data">{{ data.value }}</dd>
					</div>

					<UiDelimiter type="dotted" />

					<div
						v-for="service in store.state.serviceList"
						:key="service.id"
						class="check-wrapper"
					>
						<dt>{{ service.name }}</dt>
						<dd class="check-data">{{ formatNums(service.price) }}</dd>
					</div>

					<UiDelimiter type="solid" />

					<div class="check-wrapper total-price">
						<dt>Итого</dt>
						<dd class="green">
							{{ formatNums(totalPrice) }}
						</dd>
					</div>
				</dl>
			</div>
		</div>
	</section>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { UiDelimiter } from '@/components';
import { formatNums } from '@/helpers';

const store = useStore();

defineProps({
	checkoutData: { type: Array, default: () => [] },
});

const totalPrice = computed(() =>
	store.state.serviceList.reduce((prev, curr) => prev + curr.price, 0)
);
</script>

<style lang="scss" scoped>
.checkout {
	height: 100%;

	& .check {
		display: flex;
		flex-direction: column;
		position: relative;
		grid-gap: 15px;
		width: 100%;
		margin-bottom: 20px;
		background-color: $white;
		border-radius: 10px;
		z-index: 10;
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
		padding: 20px;

		&-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			grid-gap: 10px;
			font-weight: 400;
			font-size: 15px;
			line-height: 20px;
			letter-spacing: -0.01em;
			color: $gray-dark;

			&.total-price {
				font-size: 20px;
				font-weight: 700;
				white-space: nowrap;
				color: $base-color;

				.green {
					color: $green;
				}
			}
		}

		&-data {
			font-size: 15px;
			line-height: 20px;
			letter-spacing: -0.01em;
			color: $base-color;
		}
	}
}
</style>
