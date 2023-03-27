<template>
	<details class="ui-accordion" :open="open">
		<summary class="ui-accordion__summary">
			<div class="summary-wrapper">
				<span class="summary-wrapper__text">{{ summary }}</span>
				<span v-if="count" class="summary-wrapper__count">{{ count }}</span>
			</div>

			<div class="ui-accordion__expand">
				<InlineSvg class="ui-accordion__expand-icon" src="/static/svg/arrow-down.svg" :aria-label="open ? 'Arrow down' : 'Arrow up'"/>
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

	&__expand-icon {
		transition: transform 0.2s ease-in-out;
	}

	&[open] {
		.ui-accordion__expand-icon {
			transform: rotate(180deg);
		}
	}

	&__summary,
	&__body {
		background-color: transparent;
		margin-bottom: 10px;

		cursor: pointer;
	}

	&__summary {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 20px;
		border-bottom: 1px solid #d4d5d9;

		&::-webkit-details-marker {
			display: none;
		}

		.summary-wrapper {
			&__text {
				font-size: 20px;
				font-weight: bold;
				color: $base-color;
			}

			&__count {
				font-size: 16px;
				font-weight: normal;
				color: rgba($base-color, .7);
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
