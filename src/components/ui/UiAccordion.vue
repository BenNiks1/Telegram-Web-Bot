<template>
	<details class="ui-accordion" :open="open">
		<summary class="ui-accordion__summary">
			<div class="summary-wrapper">
				<span class="summary-wrapper__text">{{ summary }}</span>
				<span v-if="count" class="summary-wrapper__count">{{ count }}</span>
			</div>

			<div class="ui-accordion__expand">
				<InlineSvg class="ui-accordion__expand-icon" src="/static/svg/arrow-down.svg" />
			</div>
		</summary>
		<div class="ui-accordion__body">
			<slot />
		</div>
	</details>
</template>

<script lang="ts" setup>
import InlineSvg from 'vue-inline-svg';

defineProps({
	summary: {
		type: String,
		default: '',
	},
	count: {
		type: [String, Number],
		default: 0,
	},
	open: {
		type: Boolean,
		default: false,
	},
});
</script>

<style lang="scss" scoped>
.ui-accordion {
	padding: 0;
	margin: 0;
	width: 100%;
	background-color: transparent;

	&__expand {
		transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
	}

	&[open] {
		.ui-details__expand {
			transform: rotate(180deg);
		}
	}

	&__summary,
	&__body {
		background-color: transparent;
	}

	&__summary {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 20px 10px;
		border-bottom: 1px solid #d4d5d9;

		.summary-wrapper {
			&__text {
				font-size: 20px;
				font-weight: bold;
				color: $base-color;
			}

			&__count {
				font-size: 16px;
				font-weight: normal;
				color: #888a96;
				margin-left: 5px;
			}
		}
	}

	&__body {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
		margin-left: 20px;
		padding: 10px 20px;
		border-bottom: 1px solid #d4d5d9;
	}
}
</style>
