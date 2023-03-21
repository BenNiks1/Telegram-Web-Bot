<template>
	<div>
		<div class="loader" :class="[color, size]"></div>
	</div>
</template>

<script setup>
defineProps({
	color: {
		type: String,
		default: 'primary',
		validator: (value) => ['primary', 'white'].includes(value),
	},
	size: {
		type: String,
		default: 'md',
		validator: (value) => ['sm', 'md', 'lg'].includes(value),
	},
});
</script>

<style lang="scss" scoped>
.loader {
	display: inline-block;

	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);

	&::after {
		content: ' ';
		display: block;
		border-radius: 50%;
		animation: loader 0.7s linear infinite;
		border: 6px solid $white;
		margin: 8px;
	}

	&.primary {
		&::after {
			border-color: $primary transparent $primary transparent;
		}
	}

	&.white {
		&::after {
			border-color: $white transparent $white transparent;
		}
	}

	&.sm {
		width: 32px;
		height: 32px;

		&::after {
			width: 20px;
			height: 20px;
			border-width: 3px;
		}
	}

	&.md {
		width: 64px;
		height: 64px;

		&::after {
			width: 40px;
			height: 40px;
		}
	}

	&.lg {
		width: 128px;
		height: 128px;

		&::after {
			width: 80px;
			height: 80px;
			border-width: 12px;
		}
	}
}

@keyframes loader {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
